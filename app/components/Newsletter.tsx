export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif mb-4">Join Our Newsletter</h2>
        <p className="mb-8 text-gray-600">Be the first to know about new collections and exclusive offers.</p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
          />
          <button className="bg-black text-white px-8 py-2 hover:bg-gray-800">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}