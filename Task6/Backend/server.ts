import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";
import { logger } from "./src/utils/logger.js";

const PORT: number = config.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
