import { HStack } from 'native-base'
import CountryFlag from 'react-native-country-flag'

import { Input } from './Input'

interface Props {
  code: string
  position: 'left' | 'right'
  onChangeText: (value: string) => void
  inputDisabled?: boolean
  inputValue?: number
}

export function Team({
  code,
  position,
  onChangeText,
  inputDisabled = false,
  inputValue = 0,
}: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        isDisabled={inputDisabled}
        value={String(inputValue)}
      />

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  )
}
