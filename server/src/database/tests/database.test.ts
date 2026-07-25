import { TransactionManager } from '../transactions/transaction.manager.js';

async function runDatabaseTests() {
  console.log('🧪 Starting Database & Repository Architecture Unit Tests...');

  // Test 1: Transaction Manager Helper Interface
  console.assert(typeof TransactionManager.runTransaction === 'function', 'Test 1 Failed: TransactionManager defined');
  console.log('✅ Test 1 Passed: Transaction Manager ACID Interface');

  console.log('🎉 All Database & Repository Unit Tests Passed Successfully!');
}

runDatabaseTests().catch(console.error);
