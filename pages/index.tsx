import Head from "next/head";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface DataType {
  ADRES: string;
  FDRM_CLOSE_DATE: string;
  LBRRY_NAME: string;
  TEL_NO: string;
  LBRRY_SEQ_NO: string;
}

export default function Home({
  data,
  data2,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const optionName = [
    "중구",
    "종로구",
    "용산구",
    "은평구",
    "서대문구",
    "마포구",
    "광진구",
    "성동구",
    "중랑구",
    "동대문구",
    "성북구",
    "도봉구",
    "강북구",
    "노원구",
    "강서구",
    "구로구",
    "영등포구",
    "동작구",
    "관악구",
    "금천구",
    "양천구",
    "강남구",
    "서초구",
    "송파구",
    "강동구",
  ];

  const [list, setList] = useState<DataType[]>([]);
  const [name, setName] = useState("중구");
  const [modalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState<(string | undefined)[]>(
    new Array(4)
  );

  useEffect(() => {
    let arr: DataType[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].CODE_VALUE === name) {
        arr.push(data[i]);
      }
    }
    for (let i = 0; i < data2.length; i++) {
      if (data2[i].CODE_VALUE === name) {
        arr.push(data2[i]);
      }
    }
    setList(arr);
  }, [name]);

  const handleSelect = (event: React.MouseEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setName(target.value);
  };

  const handleOption = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.dataset.name !== undefined) {
      setModalVisible(true);
      setListData([
        target.dataset.name,
        target.dataset.address,
        target.dataset.date,
        target.dataset.tel,
      ]);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-blue-50">
      <Head>
        <title>서울시 도서관 이용시간 안내</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="kjin" />
        <meta
          property="og:url"
          content="https://seoul-library-info-project.vercel.app/"
        />
        <meta
          name="description"
          content="서울시 도서관, 도서관 운영시간 정보"
        />

        <meta property="og:title" content="서울시 도서관 이용시간 안내" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1622517806764-c3c9db0053fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
        <meta property="og:image:alt" content="도서관 이미지" />
        <meta
          property="og:description"
          content="서울시 도서관 운영시간을 확인해보세요."
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
        <div className="text-xl font-bold">
          📖 서울시 도서관 운영시간 안내 📖
        </div>
        {modalVisible && (
          <div className="z-[1] fixed w-[80%] md:w-[50%] h-[70vh] rounded-md bg-white drop-shadow-md flex flex-col">
            <div
              onClick={() => setModalVisible(false)}
              className="p-3 px-5 hover:cursor-pointer self-end"
            >
              X
            </div>
            <div className="w-[100%] h-[75%] flex flex-col justify-center items-center">
              {listData[0] && (
                <div className="text-xl font-bold m-2">{listData[0]}</div>
              )}
              {listData[1] && (
                <div className="m-2 text-center">주소 | {listData[1]}</div>
              )}
              {listData[2] && <div className="m-2">휴관일 | {listData[2]}</div>}
              {listData[3] && <div className="m-2">TEL | {listData[3]}</div>}
            </div>
          </div>
        )}
        <select
          id="select"
          className="p-2 m-8 text-center drop-shadow-md rounded-md bg-white"
          onClick={handleSelect}
        >
          {optionName.map((item, index) => (
            <option key={index} value={item} className="mr-2">
              {item}
            </option>
          ))}
        </select>
        <div
          id="scroll"
          className="w-[80%] md:w-[50%] lg:w-[30%] h-[50vh] overflow-y-scroll"
        >
          <div className="text-center" onClick={handleOption}>
            {list.map((item) => (
              <div
                data-address={item.ADRES}
                data-date={item.FDRM_CLOSE_DATE}
                data-name={item.LBRRY_NAME}
                data-tel={item.TEL_NO}
                key={item.LBRRY_SEQ_NO}
                className="hover:cursor-pointer hover:bg-blue-100 bg-white drop-shadow-md m-2 p-3 rounded-md"
              >
                {item.LBRRY_NAME}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await (
    await fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_API_KEY}/json/SeoulLibraryTimeInfo/1/700`
    )
  ).json();
  const data: DataType = await results.SeoulLibraryTimeInfo.row;

  const results2 = await (
    await fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_API_KEY}/json/SeoulLibraryTimeInfo/701/1485`
    )
  ).json();
  const data2: DataType = await results2.SeoulLibraryTimeInfo.row;

  return {
    props: {
      data,
      data2,
    },
  };
};
