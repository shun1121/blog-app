import { useMantineColorScheme } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { Pagenation } from '../types/pagination'

export const Pagination = ({ currentPageNum, maxPageNum }: Pagenation) => {
  const { colorScheme } = useMantineColorScheme()
  const light = colorScheme === "light"
  const prevPage = currentPageNum - 1
  const nextPage = currentPageNum + 1

  return (
    <div className='mt-10 mb-10'>
      <div className='mx-auto flex items-center justify-between max-w-[930px]'>
        <div className={currentPageNum !== 1 ? clsx("w-[120px] h-[44px] rounded-[5px] bg-dark-6 hover:bg-dark-4", {"bg-gray-10 hover:bg-gray-4": light}) : "invisible"}>
          <Link href={`/blog/page/${prevPage}`}>
            <a className='flex w-full h-full justify-center items-center font-bold'>戻る</a>
          </Link>
        </div>
        <div className={currentPageNum !== maxPageNum ? clsx("w-[120px] h-[44px] rounded-[5px] bg-dark-6 hover:bg-dark-4", {"bg-gray-10 hover:bg-gray-4": light}) : "invisible"}>
          <Link href={`/blog/page/${nextPage}`}>
            <a className='flex w-full h-full justify-center items-center font-bold'>次へ</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
