<div class="flex min-h-screen bg-gray-200">
  <aside class="flex min-h-screen w-64 flex-col gap-6 bg-white p-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin panel</h1>
    <nav class="flex flex-col gap-3">
      <a class="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"> Dashboard </a>
      <a class="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"> Products </a><a class="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"> Setting </a>
    </nav>
    <a class="mt-auto flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700"> Logout</a>
  </aside>
  <main class="flex-1 p-8">
    <h1 class="mb-6 flex text-3xl font-bold">Dashboard</h1>
    <div class="grid grid-cols-1 gap-6 p-5 md:grid-cols-3">
      <div class="rounded-xl bg-white p-6 shadow-lg">
        <h3 class="text-xl font-semibold">Users</h3>
        <p class="mt-2 text-3xl font-bold">1,245</p>
      </div>
      <div class="rounded-xl bg-white p-6 shadow-lg">
        <h3 class="text-xl font-semibold">Tickets</h3>
        <p class="mt-2 text-3xl font-bold">512</p>
      </div>
      <div class="rounded-xl bg-white p-6 shadow-lg">
        <h3 class="text-xl font-semibold">Users</h3>
        <p class="mt-2 text-3xl font-bold">1,245</p>
      </div>
    </div>

    <h1 class="mb-6 p-4 flex text-3xl font-bold">Revenue by Area</h1>

    <div class="grid gap-6  rounded-xl bg-white shadow-2xl">
     <div class="flex justify-end p-6">
       <h1 class="py-4 px-12 bg-blue-700 rounded-xl w-fit  text-white text-xl text-cente font-bold">+ Add</h1>
     </div>
     <div class="m-5 rounded-2xl shadow-2xl ">
      <table class="min-w-full border border-gray-200 rounded-2xl overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-xl font-semibold text-gray-700 shadow-sm">Area</th>
          <th class="px-6 py-3 text-left text-xl font-semibold text-gray-700 shadow-sm">Revenue</th>
          <th class="px-6 py-3 text-left text-xl font-semibold text-gray-700 shadow-sm">Growth</th>
          <th class="px-6 py-3 text-left text-xl font-semibold text-gray-700 shadow-sm">Status</th>
        </tr>
      </thead>

      <tbody class="text-xl ">
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 shadow-sm">Ahmedabad</td>
          <td class="px-6 py-4 shadow-sm">$45,000</td>
          <td class="px-6 py-4 shadow-sm">12%</td>
          <td class="px-6 py-4 shadow-sm text-green-600 font-semibold">Active</td>
        </tr>

        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 shadow-sm">Mumbai</td>
          <td class="px-6 py-4 shadow-sm">$65,500</td>
          <td class="px-6 py-4 shadow-sm">8%</td>
          <td class="px-6 py-4 shadow-sm text-green-600 font-semibold">Active</td>
        </tr>

        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 shadow-sm">Delhi</td>
          <td class="px-6 py-4 shadow-sm">$39,800</td>
          <td class="px-6 py-4 shadow-sm">5%</td>
          <td class="px-6 py-4 shadow-sm text-red-600 font-semibold">Inactive</td>
        </tr>
      </tbody>
    </table>
     </div>
    </div>
  </main>
</div>
