"use client";

import SimpleInfoCard from "@/components/Card/SimpleInfoCard";
import { NoData } from "@/components/Error/NoData";
import Filter from "@/components/Filter/Filter";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import { UserDto } from "@/types/user";
import { useDebounceQuery } from "@/utils/requests/getSwr";
import { useState } from "react";

export default function UsersPage() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const urlGetUsers = nameFilter ? `users?filter=${nameFilter}` : `users`;

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useDebounceQuery<UserDto[]>(urlGetUsers);

  if (usersError) {
    return <NoData text="Error fetching data!" isAbsolute/>;
  }

  if (usersLoading) {
    return <LoadingData isAbsolute/>;
  }

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title="Users"
        description="All users registered in system"
      />

      <div className="lg:w-2/3 w-full flex items-center justify-center">
        <Filter
          value={nameFilter}
          setValue={(e: string) => setNameFilter(e)}
          placeholder="Search for user name, email or username"
          searchOptions={
            <p className="text-sm text-gray-500">
              {users ? users.length : "0"} items founded
            </p>
          }
        />
      </div>

      {!users || users.length === 0 ? 
      <p className="my-4 text-lg font-semibold">No users!</p>
      : <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mx-auto">
        {users.map((user) => (
          <SimpleInfoCard
            key={user._id.$oid}
            title={user.username}
            text={user.name}
            version={2}
            href={`/users/${user.username}`}
            description={user.email}
          />
        ))}
      </div>}
    </div>
  );
}
