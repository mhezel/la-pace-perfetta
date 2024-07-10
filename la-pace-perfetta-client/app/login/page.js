import SignInButton from "../_components/SignInButton";

export default function Page() {
  return (

    <div className="grid grid-cols-2 gap-10 text-lg items-center justify-center mt-10">
      <div className="mx-auto">
        <h1 className="text-4xl mb-10 text-accent-400 font-semibold">
          Welcome to La Pace Perfetta!
        </h1>
        <div className="space-y-8">
          <p>
            Where nature's beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it's not just about the luxury cabins.
            It's about the experience of reconnecting with nature and enjoying
            simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you'll find in the surrounding mountains. Wander through lush
            forests, breathe in the fresh air, and watch the stars twinkle above
            from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by nature's
            splendor. It's a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-6">
          Sign in to access your guest area
        </h2>
        <SignInButton />
      </div>
    </div>
  );
}

   {/* <div className="flex flex-col gap-10 mt-10 items-center">
      <SignInButton/>
    </div> */}
