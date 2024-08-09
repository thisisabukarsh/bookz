const HeaderSection: React.FC = () => (
  <div className="relative w-full max-w-screen-lg mb-12 fade-in opacity-0 transition-opacity duration-600">
    <div className="absolute inset-0 z-0">
      {/* <Image
        src="/assets/exchangePP.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      /> */}
    </div>
    <div className="relative z-10 text-center py-20 px-6 bg-black bg-opacity-60 rounded-lg">
      <h1 className="text-5xl font-extrabold text-white mb-4">About Us</h1>
      <p className="text-lg text-gray-200">
        Welcome to Student Book Exchange, a platform that connects students to
        facilitate the exchange of educational resources. We are committed to
        fostering a collaborative learning environment where knowledge can be
        shared freely.
      </p>
    </div>
  </div>
);

export default HeaderSection;
