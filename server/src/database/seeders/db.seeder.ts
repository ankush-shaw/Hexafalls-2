import { User } from '../../models/user.model.js';
import { Workspace } from '../schemas/domain.models.js';
import logger from '../../logger/logger.js';

export async function seedDatabase(): Promise<{ userSeeded: boolean; workspaceSeeded: boolean }> {
  let userSeeded = false;
  let workspaceSeeded = false;

  // 1. Seed Admin User
  const existingAdmin = await User.findOne({ email: 'admin@aegisos.ai' });
  let adminUserId = existingAdmin?._id;

  if (!existingAdmin) {
    const admin = new User({
      name: 'System Administrator',
      email: 'admin@aegisos.ai',
      passwordHash: 'AdminSecretKey2026!',
      role: 'admin',
      isActive: true,
    });
    await admin.save();
    adminUserId = admin._id;
    userSeeded = true;
    logger.info('[Seeder] Default Admin user created: admin@aegisos.ai');
  }

  // 2. Seed Default Workspace
  const existingWorkspace = await Workspace.findOne({ workspaceId: 'ws-default-01' });
  if (!existingWorkspace && adminUserId) {
    const workspace = new Workspace({
      workspaceId: 'ws-default-01',
      name: 'AegisOS Enterprise Workspace',
      ownerId: adminUserId,
      members: [adminUserId],
      settings: { theme: 'dark', autoApproveStrategy: false },
    });
    await workspace.save();
    workspaceSeeded = true;
    logger.info('[Seeder] Default workspace created: ws-default-01');
  }

  return { userSeeded, workspaceSeeded };
}
