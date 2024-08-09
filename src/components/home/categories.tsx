import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    id: "tech",
    name: "Technology",
    description: "Latest in technology.",
    image: "/assets/exchangePP.jpg",
  },
  {
    id: "science",
    name: "Science",
    description: "Discover scientific advances.",
    image: "/assets/exchange2.jpg",
  },
  {
    id: "literature",
    name: "Literature",
    description: "Explore classic and modern literature.",
    image: "/assets/exchangePP.jpg",
  },
  {
    id: "history",
    name: "History",
    description: "Learn about historical events and figures.",
    image: "/assets/exchange2.jpg",
  },
  // Add more categories as needed
];

const Categories: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg mb-16 fade-in opacity-0 transition-opacity duration-600">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore by Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/posts/${category.id}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm">{category.description}</p>
                    </div>
                  </div>
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="responsive"
                    width={400}
                    height={250}
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
