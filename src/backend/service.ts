import { db } from "./db";

type Result = {
  message: string;
  type: "info" | "error";
  status: number
};

const Service = {
  createSubscriber: async (email: string): Promise<Result> => {
    try {
      db.run("INSERT INTO subscribers (raw_email) VALUES (?)", [email]);
      return { message: "Thanks! We'll keep you posted.", type: "info", status: 201 };
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("UNIQUE constraint failed")) {
          return { message: "You are already on the list!", type: "info", status: 200 };
        }
        if (e.message.includes("CHECK constraint failed")) {
          return { message: "Please provide a valid email address.", type: "error", status: 400 };
        }
      }
      return { message: "Unexpected error. Please try again later.", type: "error", status: 500 };
    }
  },
};

export { Service};
