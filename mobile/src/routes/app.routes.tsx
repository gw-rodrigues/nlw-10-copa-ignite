import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
/**
 * Platform - serve para identificar qual ambiente no App está a rodar (OS, Android, Etc...)
 */
import { Platform } from 'react-native'
import { Details } from '../screens/Details'
import { Find } from '../screens/Find'
import { New } from '../screens/New'
import { Polls } from '../screens/Polls'

/**
 * Fazemos a inicialização das rotas
 * -> Navigator - será contexto que estará as rotas
 * -> Screen - será as rotas em si, dizendo qual componente deve ser renderizado
 */
const { Navigator, Screen } = createBottomTabNavigator()

//Routes nada mais que componentes retornados
/**
 * -> Navigator - pode receber parâmetros "screenOptions" para alterar visuais da nossa navegação
 *    -> headerShown - true/false : remover nome página default topo app/cabeçalho
 *    -> tabBarLabelPosition - podemos alterar qual a orientação do texto com icon (cima, baixo, lado, ...)
 *    -> tabBarActiveTintColor - cor do texto quando página/nav está ativa/selecionada
 *    -> tabBarInactiveTintColor - cor do texto quando página/nav nao está ativa/selecionada
 *    -> tabBarStyle - podemos alterar alguns estilos da barra para melhor visualmente
 *      -> position, height,
 *    -> tabBarItemStyle - iremos alterar o estilo de cada item de navegação
 */

/**
 * Icons - para aplicar icons cada item dever ser nos Screen, caso colocar no Navigator será aplicado
 * em todas estrutura de navegação.
 *
 * -> Screens - também pode receber parâmetros, sendo este para alterar o icon o "tabBarIcon", recebendo
 * icon externo método de função
 *  -> mudar cor icon - função recebe param "color" que pode ser usado no icon "({ color }) => <PlusCircle color={color} />"
 *  -> tabBarLabel - podemos definir um nome customizado para label dos items da navegação
 *  -> Quando nao queremos que um item especifico de navegação apareça, podemos adicionar parâmetro button
 *      que retorna null (nada), assim item nao é renderizado. "tabBarButton: () => null,"
 */

export function AppRoutes() {
  /**
   * Para usar as corer do nosso theme, temos que importar o theme no native-nase
   * *Nao podemos usar valores diretos no navigator porque ele nao entende/reconhece os valores do tema
   *
   * iremos usar useTheme e desestrutura e usar o param colors, que contém todos as valors do tema
   * podemos buscar outros params como o "size" para pegar valores de tamanho do tema.
   */
  const { colors, sizes } = useTheme()
  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[20],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={iconSize} />
          ),
          tabBarLabel: 'NEW BET',
        }}
      />
      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={iconSize} />
          ),
          tabBarLabel: 'MY BETS',
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}
