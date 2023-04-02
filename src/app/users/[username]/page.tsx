"use client"

import DeviceBottomInfo from "@/components/Device/DeviceBottomInfo";
import DeviceMainInfo from "@/components/Device/DeviceMainInfo";
import DeviceTopInfoGrid from "@/components/Device/TopInfoGrid";
import { NoData } from "@/components/Error/NoData";
import { LoadingData } from "@/components/Loading/LoadingData";
import PageTitle from "@/components/PageTitle/PageTitle";
import UserTopInfoGrid from "@/components/User/TopInfoGrid";
import UserMainInfo from "@/components/User/UserMainInfo";
import { DeviceDto } from "@/types/device";
import { CountDocumentsDto } from "@/types/documents";
import { UserDto } from "@/types/user";
import { useQuery } from "@/utils/requests/getSwr";

export default function UserUsernamePage({params}: any) {
  const user_username = params.username;

  const urlGetUserInfo = `users/${user_username}`;
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
    mutate: mutateUserInfo,
  } = useQuery<UserDto>(urlGetUserInfo);

  const urlGetUserDevicesInfo = `users/${user_username}/devices`;
  const {
    data: userDevicesInfo,
    isLoading: userDevicesInfoLoading,
    error: userDevicesInfoError,
    mutate: mutateUserDevicesInfo,
  } = useQuery<DeviceDto[]>(urlGetUserDevicesInfo);

  const urlGetUserCountDocuments = `users/${user_username}/count_documents`;
  const {
    data: userCountDocuments,
    isLoading: userCountDocumentsLoading,
    error: userCountDocumentsError,
    mutate: mutateUserDeviceCountDocuments,
  } = useQuery<CountDocumentsDto>(urlGetUserCountDocuments);

  //Ocorreu um erro
  if (userInfoError || userCountDocumentsError || userDevicesInfoError) {
    return <NoData text="Error fetching data!!" isAbsolute/>;
  }

  //A carregar os dados
  if (userInfoLoading || userCountDocumentsLoading || userDevicesInfoLoading) {
    return <LoadingData isAbsolute/>;
  }

  const { name, email, username } = userInfo;

  return (
    <div className="flex flex-col space-y-5 md:space-y-10 justify-center items-center">
      <PageTitle
        title={username}
        description={`${name} (${email})`}
      />
      
      <UserTopInfoGrid userCountDocuments={userCountDocuments}/>
      <UserMainInfo user_username={user_username} userDevicesInfo={userDevicesInfo} mutateUserInfo={mutateUserInfo} mutateUserDeviceCountDocuments={mutateUserDeviceCountDocuments} mutateUserDevicesInfo={mutateUserDevicesInfo}/>
      {/* <DeviceBottomInfo deviceInfo={deviceInfo} mutateDeviceInfo={mutateDeviceInfo} mutateDeviceCountDocuments={mutateDeviceCountDocuments}/> */}
    </div>
  );
}