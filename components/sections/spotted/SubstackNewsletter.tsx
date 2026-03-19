export default function SubstackNewsletter() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f7] px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Subscribe to My Newsletter</h1>

        <iframe
          src="https://spottedbysattya.substack.com"
          width="100%"
          height="320"
          style={{ border: "1px solid #EEE", background: "white" }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
