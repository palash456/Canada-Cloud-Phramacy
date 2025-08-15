import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Website</h1>
      <Image
        src="/path/to/image.jpg"
        alt="Description of image"
        width={500}
        height={300}
      />
    </main>
  );
}
