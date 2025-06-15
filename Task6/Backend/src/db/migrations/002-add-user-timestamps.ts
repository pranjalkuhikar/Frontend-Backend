import { Migration } from "./migration.js";
import { User } from "../../models/user.model.js";

export class AddUserTimestamps extends Migration {
  protected name = "add-user-timestamps";
  protected version = 2;

  protected async migrate(): Promise<void> {
    // Add timestamps to existing documents
    await User.updateMany({ createdAt: { $exists: false } }, [
      {
        $set: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ]);

    // Create TTL index for verification tokens
    await User.collection.createIndex(
      { verificationTokenExpires: 1 },
      { expireAfterSeconds: 0 }
    );

    // Create TTL index for reset password tokens
    await User.collection.createIndex(
      { resetPasswordExpires: 1 },
      { expireAfterSeconds: 0 }
    );
  }
}
