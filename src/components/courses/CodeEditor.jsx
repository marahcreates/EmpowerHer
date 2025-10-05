import React, { useState, useEffect, useRef } from 'react';

const CodeEditor = ({ starterCode, expectedOutput, onSuccess, isCompleted }) => {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testPassed, setTestPassed] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCode(starterCode);
    setOutput('');
    setError('');
    setTestPassed(false);
  }, [starterCode]);

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const executePythonCode = (pythonCode) => {
    const lines = pythonCode.split('\n');
    const outputs = [];
    const variables = {};

    try {
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
          i++;
          continue;
        }

        // Handle variable assignment
        if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.includes('!=') &&
            !trimmed.includes('<=') && !trimmed.includes('>=')) {
          const [varName, value] = trimmed.split('=').map(s => s.trim());
          let evalValue = value;

          if (value.startsWith('"') || value.startsWith("'")) {
            evalValue = value.slice(1, -1);
          } else if (!isNaN(value)) {
            evalValue = Number(value);
          } else if (value.startsWith('[')) {
            evalValue = JSON.parse(value.replace(/'/g, '"'));
          } else if (value.startsWith('{')) {
            evalValue = JSON.parse(value.replace(/'/g, '"'));
          } else if (value === 'True') {
            evalValue = true;
          } else if (value === 'False') {
            evalValue = false;
          } else if (/[+\-*/%]/.test(value)) {
            evalValue = evaluateExpression(value, variables);
          } else if (variables.hasOwnProperty(value)) {
            evalValue = variables[value];
          }

          variables[varName] = evalValue;
          i++;
        }
        // Handle print statements
        else if (trimmed.startsWith('print(')) {
          const match = trimmed.match(/print\((.*)\)/);
          if (match) {
            const content = match[1].trim();
            let printValue;

            if (content.startsWith('"') || content.startsWith("'")) {
              printValue = content.slice(1, -1);
            } else if (variables.hasOwnProperty(content)) {
              printValue = variables[content];
            } else if (content.includes('[')) {
              const [varName, indexPart] = content.split('[');
              const index = parseInt(indexPart.replace(']', ''));
              printValue = variables[varName.trim()][index];
            } else if (content.startsWith('f"') || content.startsWith("f'")) {
              // Handle f-strings
              let fString = content.slice(2, -1);
              for (let [key, value] of Object.entries(variables)) {
                fString = fString.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
              }
              printValue = fString;
            } else {
              printValue = content;
            }

            outputs.push(String(printValue));
          }
          i++;
        }
        // Handle if/else statements
        else if (trimmed.startsWith('if ')) {
          const condition = trimmed.match(/if (.+):/)[1];
          const conditionResult = evaluateCondition(condition, variables);

          const ifBlockLines = [];
          const elseBlockLines = [];
          let inElseBlock = false;
          i++;

          // Collect indented block
          while (i < lines.length) {
            const currentLine = lines[i];
            if (currentLine.trim() === 'else:') {
              inElseBlock = true;
              i++;
              continue;
            } else if (currentLine.match(/^\s+\S/)) {  // Has indentation and content
              if (inElseBlock) {
                elseBlockLines.push(currentLine.trim());
              } else {
                ifBlockLines.push(currentLine.trim());
              }
              i++;
            } else if (currentLine.trim() === '') {
              i++;
            } else {
              break;
            }
          }

          const blockToExecute = conditionResult ? ifBlockLines : elseBlockLines;
          for (let blockLine of blockToExecute) {
            if (blockLine.startsWith('print(')) {
              const match = blockLine.match(/print\((.+)\)/);
              if (match) {
                const content = match[1].trim();
                if (content.startsWith('"') || content.startsWith("'")) {
                  outputs.push(content.slice(1, -1));
                } else if (variables.hasOwnProperty(content)) {
                  outputs.push(String(variables[content]));
                } else {
                  outputs.push(content);
                }
              }
            }
          }
        }
        // Handle for loops
        else if (trimmed.startsWith('for ')) {
          const match = trimmed.match(/for (\w+) in (.+):/);
          if (match) {
            const [, varName, iterableExpr] = match;
            let iterable;

            if (iterableExpr.includes('range(')) {
              const rangeMatch = iterableExpr.match(/range\((\d+)(?:,\s*(\d+))?\)/);
              if (rangeMatch) {
                const start = rangeMatch[2] ? parseInt(rangeMatch[1]) : 0;
                const end = rangeMatch[2] ? parseInt(rangeMatch[2]) : parseInt(rangeMatch[1]);
                iterable = Array.from({ length: end - start }, (_, idx) => start + idx);
              }
            } else if (variables[iterableExpr]) {
              iterable = variables[iterableExpr];
            } else if (iterableExpr.startsWith('[')) {
              iterable = JSON.parse(iterableExpr.replace(/'/g, '"'));
            }

            const loopBody = [];
            i++;

            // Collect loop body
            while (i < lines.length) {
              const currentLine = lines[i];
              if (currentLine.match(/^\s+\S/)) {  // Has indentation and content
                loopBody.push(currentLine.trim());
                i++;
              } else if (currentLine.trim() === '') {
                i++;
              } else {
                break;
              }
            }

            // Execute loop
            for (let item of iterable) {
              variables[varName] = item;
              for (let bodyLine of loopBody) {
                if (bodyLine.startsWith('print(')) {
                  const printMatch = bodyLine.match(/print\((.+)\)/);
                  if (printMatch) {
                    const content = printMatch[1].trim();
                    if (variables.hasOwnProperty(content)) {
                      outputs.push(String(variables[content]));
                    } else if (content.startsWith('"') || content.startsWith("'")) {
                      outputs.push(content.slice(1, -1));
                    }
                  }
                }
              }
            }
          } else {
            i++;
          }
        } else {
          i++;
        }
      }

      return outputs.join('\n');
    } catch (err) {
      throw new Error(`Execution error: ${err.message}`);
    }
  };

  const evaluateExpression = (expr, vars) => {
    let evalExpr = expr;
    for (let [key, value] of Object.entries(vars)) {
      evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }

    try {
      if (evalExpr.includes('**')) {
        evalExpr = evalExpr.replace(/(\d+)\s*\*\*\s*(\d+)/, 'Math.pow($1, $2)');
      }
      return eval(evalExpr);
    } catch {
      return 0;
    }
  };

  const evaluateCondition = (condition, vars) => {
    let evalCondition = condition;

    for (let [key, value] of Object.entries(vars)) {
      const replacement = typeof value === 'string' ? `"${value}"` : value;
      evalCondition = evalCondition.replace(new RegExp(`\\b${key}\\b`, 'g'), replacement);
    }

    try {
      return eval(evalCondition);
    } catch {
      return false;
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    setTestPassed(false);

    setTimeout(() => {
      try {
        const result = executePythonCode(code);
        setOutput(result);

        if (result.trim() === expectedOutput.trim()) {
          setTestPassed(true);
          if (!isCompleted && onSuccess) {
            setTimeout(() => onSuccess(), 500);
          }
        } else {
          setError(`Expected output: ${expectedOutput}\nYour output: ${result || '(empty)'}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsRunning(false);
      }
    }, 300);
  };

  const resetCode = () => {
    setCode(starterCode);
    setOutput('');
    setError('');
    setTestPassed(false);
  };

  return (
    <div className="code-editor-container">
      <div className="editor-wrapper">
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Write your Python code here..."
        />
      </div>

      <div className="editor-controls">
        <button
          className="run-btn"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? '⏳ Running...' : '▶ Run Code'}
        </button>
        <button
          className="reset-btn"
          onClick={resetCode}
        >
          ↺ Reset
        </button>
      </div>

      <div className="console-wrapper">
        <div className="console-header">Output Console</div>
        <div className={`console-output ${testPassed ? 'success' : ''} ${error ? 'error' : ''}`}>
          {testPassed && (
            <div className="success-message">
              ✓ Test passed! Output is correct.
            </div>
          )}
          {output && !error && (
            <pre className="output-text">{output}</pre>
          )}
          {error && (
            <div className="error-message">
              <strong>Error:</strong>
              <pre>{error}</pre>
            </div>
          )}
          {!output && !error && !testPassed && (
            <div className="empty-console">Click "Run Code" to see output</div>
          )}
        </div>
      </div>

      {isCompleted && (
        <div className="completed-badge">
          ✓ Already Completed
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
