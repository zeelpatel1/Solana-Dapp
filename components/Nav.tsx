import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Plus, Send, Zap } from 'lucide-react'
import Airdrop from './Airdrop'
import Balance from './Balance'

const Nav = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <Tabs defaultValue="balance" className="w-full max-w-xl">
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 p-1 rounded">
          <TabsTrigger
            value="balance"
            className="font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black px-4 py-2 rounded transition"
          >
            <Zap className="w-4 h-4 mr-2" />
            Balance
          </TabsTrigger>

          <TabsTrigger
            value="airdrop"
            className="font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black px-4 py-2 rounded transition"
          >
            <Zap className="w-4 h-4 mr-2" />
            Airdrop
          </TabsTrigger>

          <TabsTrigger
            value="send"
            className="font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black px-4 py-2 rounded transition"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </TabsTrigger>

          <TabsTrigger
            value="mint"
            className="font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black px-4 py-2 rounded transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Mint
          </TabsTrigger>
        </TabsList>


        <TabsContent value="balance">
          <Balance />
        </TabsContent>

        <TabsContent value="airdrop">
          <Airdrop />
        </TabsContent>

        <TabsContent value="send">
          {/* Replace with actual send component */}
          <div className="text-center text-gray-500">Send Component Here</div>
        </TabsContent>

        <TabsContent value="mint">
          {/* Replace with actual mint component */}
          <div className="text-center text-gray-500">Mint Component Here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Nav
