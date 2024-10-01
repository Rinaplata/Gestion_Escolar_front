import { Input } from "../components";

export const Signup = () => {
  return (
    <div className="flex items-center p-28 justify-center">
      <div className="bg-white px-20 py-20 rounded-3xl border-9 border-transparent shadow-2xl w-full max-w-3xl">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>

        <div className="mt-6 w-full">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-2 sm:grid-cols-2 gap-6 gap-x-6"
          >
            <div>
              <label
                htmlFor="fullname"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-1">
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  placeholder="Alvin Jakitori"
                  autoComplete="fullname"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="user@gestionescolar.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="300000000"
                  autoComplete="phone"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="datebirth"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <Input
                  id="datebirth"
                  name="datebirth"
                  type="date"
                  required
                  autoComplete="datebirth"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Calle #"
                  autoComplete="address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="sm:col-span-6">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="alvinjaki"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#006732] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#009e4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-[#8dc109] hover:text-[#4f6d02]"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
