import { useState, useEffect } from 'react'
import { Share } from 'react-native'
import { VStack, useToast, HStack } from 'native-base'
import { useRoute } from '@react-navigation/native'

import { api } from '../services/api'

import { Option } from '../components/Option'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { Guesses } from '../components/Guesses'
import { PoolPros } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'

interface RouterParams {
  id: string
}

export function Details(){ 
  const [isLoading, setIsLoading] = useState(false)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros)
  const route = useRoute()
  const toast = useToast()
  const { id } = route.params as RouterParams

  async function fechPoolDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)

    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare(){
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fechPoolDetails()
  }, [id])

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
        title={poolDetails.title} 
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {
        poolDetails._count?.participants > 0 ?
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails}/>

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option 
              title="Seu palpites" 
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option 
              title="Ranking do grupo" 
              isSelected={optionSelected === 'ranking'} 
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack> 

          <Guesses poolId={poolDetails.id} code={poolDetails.code} /> 
        </VStack>

        : <EmptyMyPoolList  code={poolDetails.code}/>
      }

    </VStack>
  )
}