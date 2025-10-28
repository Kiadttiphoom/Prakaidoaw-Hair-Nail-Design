import { mysqlPool } from "@/lib/db";

export async function GET() {
  const [stylists] = await mysqlPool.query("SELECT * FROM stylists WHERE is_active = 1");

  return Response.json({
    message: "success",
    data: { stylists },
  });
}
