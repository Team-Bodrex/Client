export default function Login() {
  return (
    <>
      <div class="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
        <form class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <div class="mt-4">
          <p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Or login with
          </p>
          <div class="flex justify-center space-x-4 mt-2">
            <button class="bg-red-600 text-white p-2 rounded-lg">Google</button>
            <button class="bg-black text-white p-2 rounded-lg">GitHub</button>
          </div>
        </div>
      </div>
    </>
  );
}
