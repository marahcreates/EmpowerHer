// Script to derive private key from 12-word seed phrase
// Usage: node get-private-key.js "your 12 word seed phrase here"

import pkg from '@vechain/sdk-core';
const { HDNode, Mnemonic } = pkg;

const seedPhrase = process.argv.slice(2).join(' ');

if (!seedPhrase || seedPhrase.split(' ').length !== 12) {
  console.error('❌ Error: Please provide a 12-word seed phrase');
  console.log('\nUsage:');
  console.log('  node get-private-key.js "word1 word2 word3 ... word12"');
  console.log('\nExample:');
  console.log('  node get-private-key.js "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"');
  process.exit(1);
}

try {
  console.log('\n🔐 Deriving private key from seed phrase...\n');

  // Create mnemonic from words
  const mnemonic = Mnemonic.of(seedPhrase.split(' '));

  // Derive the HD node (VeChain uses m/44'/818'/0'/0/0 derivation path)
  const hdNode = HDNode.fromMnemonic(mnemonic.words);

  // Get the first account (index 0)
  const account = hdNode.deriveChild(0);

  const privateKey = '0x' + Buffer.from(account.privateKey).toString('hex');
  const address = account.address;

  console.log('✅ Successfully derived keys:\n');
  console.log('Address:     ', address);
  console.log('Private Key: ', privateKey);
  console.log('\n⚠️  IMPORTANT: Keep your private key secret! Never share it!\n');
  console.log('📝 Copy the private key above and paste it in your .env file as:');
  console.log(`   VECHAIN_PRIVATE_KEY=${privateKey}\n`);

} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\nMake sure your seed phrase is correct (12 words, space-separated)');
  process.exit(1);
}
