import HomeClient from "./HomeClient";

// ✅ Server Component - ดึงข้อมูลทั้งหมดก่อน render
export default async function HomePage() {
  // ✅ Parallel fetching - โหลดพร้อมกัน 3 API
  const [servicesRes, stylistsRes, reviewsRes] = await Promise.all([
    fetch(`${process.env.API_URL  || "http://localhost:3000"}/api/services`, {
      cache: "no-store", // หรือ revalidate: 60 ถ้าต้องการ cache
    }),
    fetch(`${process.env.API_URL  || "http://localhost:3000"}/api/stylists`, {
      cache: "no-store",
    }),
    fetch(`${process.env.API_URL || "http://localhost:3000"}/api/review`, {
      cache: "no-store",
    }),
  ]);

  // ✅ Parse JSON
  const servicesData = await servicesRes.json();
  const stylistsData = await stylistsRes.json();
  const reviewsData = await reviewsRes.json();

  // ✅ Extract data
  const services = servicesData?.data?.services || [];
  const stylists = stylistsData?.data?.stylists || [];
  const reviews = reviewsData?.data?.reviews || [];

  // ✅ ส่งข้อมูลไปยัง Client Component
  return (
    <HomeClient 
      services={services}
      stylists={stylists}
      reviews={reviews}
    />
  );
}