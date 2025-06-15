import { Migration } from "./migration.js";
import { User } from "../../models/user.model.js";

export class AddUserIndexes extends Migration {
  protected name = "add-user-indexes";
  protected version = 1;

  protected async migrate(): Promise<void> {
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });
    await User.collection.createIndex({ createdAt: -1 });
    await User.collection.createIndex({ verificationToken: 1 });
    await User.collection.createIndex({ resetPasswordToken: 1 });
  }
}
