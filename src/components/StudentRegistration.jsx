import React, { useState, useRef, useEffect } from 'react';
import { useConnex } from '@vechain/dapp-kit-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

function StudentRegistration({ account, onRegistrationSuccess }) {
  const connex = useConnex();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [txId, setTxId] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Start camera when component mounts
    startCamera();

    // Cleanup camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setRegistrationStatus({
        type: 'error',
        message: 'Unable to access camera. Please grant camera permissions.'
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleRegister = async () => {
    if (!connex) {
      setRegistrationStatus({ type: 'error', message: 'Wallet not connected' });
      return;
    }

    setIsRegistering(true);
    setRegistrationStatus(null);

    try {
      // First check if already registered
      const studentsMethod = connex.thor.account(CONTRACT_ADDRESS).method({
        name: 'students',
        type: 'function',
        inputs: [{ name: '', type: 'address' }],
        outputs: [
          { name: 'wallet', type: 'address' },
          { name: 'registered', type: 'bool' },
          { name: 'graduated', type: 'bool' },
          { name: 'certificate', type: 'bytes32' }
        ],
        stateMutability: 'view'
      });

      const studentResult = await studentsMethod.call(account);
      if (studentResult.decoded.registered) {
        setRegistrationStatus({
          type: 'error',
          message: 'You are already registered as a student!'
        });
        return;
      }

      // Find the addStudent function ABI
      const addStudentABI = CONTRACT_ABI.find(fn => fn.name === 'addStudent');

      if (!addStudentABI) {
        throw new Error('addStudent function not found in ABI');
      }

      console.log('Registration ABI:', addStudentABI);

      // Create the method using Connex
      const method = connex.thor.account(CONTRACT_ADDRESS).method(addStudentABI);

      // Encode the function call with 1 VET value
      const clause = method.asClause();
      clause.value = '1000000000000000000'; // 1 VET in wei

      console.log('Registration clause:', clause);
      console.log('Contract address:', CONTRACT_ADDRESS);
      console.log('Account:', account);

      const tx = connex.vendor.sign('tx', [clause])
        .signer(account)
        .comment('Register as Learn2Earn Student - Female Verification')
        .gas(200000); // Set explicit gas limit

      const result = await tx.request();
      
      if (result) {
        setTxId(result.txid);
        setRegistrationStatus({
          type: 'success',
          message: 'Registration submitted! Transaction is being processed.'
        });

        await waitForTransaction(result.txid);

        // Create initial profile to mark account as active
        try {
          const updateProfileMethod = connex.thor.account(CONTRACT_ADDRESS).method(
            CONTRACT_ABI.find(abi => abi.name === 'updateProfile')
          );

          const profileClause = updateProfileMethod.asClause('', '', '', '', false);

          await connex.vendor.sign('tx', [profileClause])
            .signer(account)
            .request();

          console.log('Initial profile created');
        } catch (err) {
          console.error('Failed to create initial profile:', err);
        }

        // Notify backend about registration
        try {
          await fetch('http://localhost:3001/api/students/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: account })
          });
        } catch (err) {
          console.error('Failed to notify backend:', err);
        }
      }
    } catch (error) {
      console.error('Error registering student:', error);
      setRegistrationStatus({
        type: 'error',
        message: error.message || 'Failed to register. Please try again.'
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const waitForTransaction = async (txId) => {
    const ticker = connex.thor.ticker();
    
    for (let i = 0; i < 10; i++) {
      await ticker.next();
      const receipt = await connex.thor.transaction(txId).getReceipt();
      
      if (receipt) {
        if (receipt.reverted) {
          setRegistrationStatus({
            type: 'error',
            message: 'Transaction reverted. Please check your balance and try again.'
          });
        } else {
          setRegistrationStatus({
            type: 'success',
            message: 'Successfully registered as a student! You can now submit proofs.'
          });

          // Stop camera after successful registration
          stopCamera();

          // Call the parent component to refresh the student status
          if (onRegistrationSuccess) {
            setTimeout(onRegistrationSuccess, 2000);
          }
        }
        break;
      }
    }
  };

  const openExplorer = () => {
    if (txId) {
      window.open(`https://explore.vechain.org/transactions/${txId}`, '_blank');
    }
  };

  return (
    <div className="card">
      <h2 style={{ color: 'white' }}>Female Verification</h2>
      <p style={{ marginBottom: '1rem', color: 'white' }}>
        To ensure TechBloom serves women in tech, we need to verify your identity.
      </p>

      <div style={{
        background: 'rgba(255, 193, 7, 0.1)',
        border: '1px solid rgba(255, 193, 7, 0.3)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '1.5rem',
        color: '#ffc107'
      }}>
        <strong>Note:</strong> Verification is turned off during the hackathon judging period.
        Click "Verify Now" to proceed with registration.
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '4/3',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <p style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#CFCFCF',
          marginTop: '0.5rem'
        }}>
          Camera preview
        </p>
      </div>

      <button
        type="button"
        onClick={handleRegister}
        className="btn"
        disabled={isRegistering || !account}
        style={{ width: '100%' }}
      >
        {isRegistering ? (
          <>
            <span className="loading"></span> Verifying...
          </>
        ) : (
          'Verify Now (1 VET)'
        )}
      </button>

      {registrationStatus && (
        <div className={`status-message ${registrationStatus.type}`}>
          {registrationStatus.message}
          {txId && registrationStatus.type === 'success' && (
            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={openExplorer}
                style={{
                  background: 'transparent',
                  border: '1px solid currentColor',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                View on Explorer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentRegistration;