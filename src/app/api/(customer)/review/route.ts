import { mysqlPool } from "@/lib/db";

export async function GET() {

  const promisePool = mysqlPool.promise();

  const [reviews] = await promisePool.query<any[]>("SELECT * FROM reviews");

  return Response.json({
    message: "success",
    data: { reviews: reviews },
  });
}

