import React from 'react'
import Page from '@/components/Page'
import request from '@/utils/request'
import { useStore } from '@/stores'
import { Sidebar } from './sidebar'
import { catalogList } from '@/data/catalog-list'

// Sample Request
const init = async () => {
  const data = await request('/posts/add', {
    title: 'I am in love with someone.',
    userId: 5
  })

  console.log('-> data', data)
}

const Home = () => {
  const [{ counter }, { increment }] = useStore('Common')

  React.useEffect(() => {
    init()
  }, [])

  return (
    <Page>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-6">
              <Sidebar playlists={catalogList} className="hidden lg:block h-screen" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">111</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Home