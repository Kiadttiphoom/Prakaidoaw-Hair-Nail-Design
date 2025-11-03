import HomeClient from "./HomeClient";

// ✅ HomePage.tsx
export const revalidate = 60; // re-generate ทุก 1 นาที

export default async function HomePage() {
  const [servicesRes, stylistsRes, reviewsRes] = await Promise.all([
    fetch(`${process.env.API_URL || "http://localhost:3000"}/api/services`, {
      next: { revalidate: 60 },
    }),
    fetch(`${process.env.API_URL || "http://localhost:3000"}/api/stylists`, {
      next: { revalidate: 60 },
    }),
    fetch(`${process.env.API_URL || "http://localhost:3000"}/api/review`, {
      next: { revalidate: 60 },
    }),
  ]);

  const [servicesData, stylistsData, reviewsData] = await Promise.all([
    servicesRes.json(),
    stylistsRes.json(),
    reviewsRes.json(),
  ]);

  const services = servicesData?.data?.services || [];
  const stylists = stylistsData?.data?.stylists || [];
  const reviews = reviewsData?.data?.reviews || [];

  return <HomeClient services={services} stylists={stylists} reviews={reviews} />;
}
