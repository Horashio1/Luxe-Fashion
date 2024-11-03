import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-serif mb-4">LUXE</h3>
          <p className="text-gray-400">Luxury fashion and accessories for the discerning customer.</p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/women">Women</Link></li>
            <li><Link href="/men">Men</Link></li>
            <li><Link href="/accessories">Accessories</Link></li>
            <li><Link href="/collections">Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/stores">Stores</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Customer Service</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/returns">Returns</Link></li>
            <li><Link href="/size-guide">Size Guide</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}