// Dependencies
import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
// Components
import Layout from '#components/Layout';
import TextBadge from '#components/TextBadge/TextBadge';
// Styles
import styles from './Sets.styles';
// Services
import { all } from '#services/sets';
import { navigate } from '#services/navigation';
// Types
import { MyObject, RootStackParamList } from '#types';

enum ExpansionType {
  EXPANSION = 'EXPANSION',
  PRICE = 'PRICE',
  PROMO = 'PROMO',
  SNEAK = 'SNEAK',
  SPECIAL = 'SPECIAL',
  STARTER = 'STARTER',
  STRUCTURE = 'STRUCTURE',
  TIN = 'TIN',
}

type SetProps = {
  id: number;
  name: string;
  code: string;
  type: ExpansionType;
};

type SetTypes = {
  [typeof ExpansionType]: Array<SetProps>;
}

const parseSets = (sets: Array<SetProps>): SetTypes => ({
  [ExpansionType.EXPANSION]: sets.filter((s: SetProps) => s.type === ExpansionType.EXPANSION),
  [ExpansionType.PRICE]: sets.filter((s: SetProps) => s.type === ExpansionType.PRICE),
  [ExpansionType.PROMO]: sets.filter((s: SetProps) => s.type === ExpansionType.PROMO),
  [ExpansionType.SNEAK]: sets.filter((s: SetProps) => s.type === ExpansionType.SNEAK),
  [ExpansionType.SPECIAL]: sets.filter((s: SetProps) => s.type === ExpansionType.SPECIAL),
  [ExpansionType.STARTER]: sets.filter((s: SetProps) => s.type === ExpansionType.STARTER),
  [ExpansionType.STRUCTURE]: sets.filter((s: SetProps) => s.type === ExpansionType.STRUCTURE),
  [ExpansionType.TIN]: sets.filter((s: SetProps) => s.type === ExpansionType.TIN),
})

const Sets = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Sets'>>();
  const [sets, setSets] = React.useState<SetTypes | null>(null);
  const [expansionType, setExpansionType] = React.useState<ExpansionType>(ExpansionType.EXPANSION);

  const fetchSets = ({ eraId }: MyObject) => all({ eraId }).then((res: MyObject) => {
    const parsedSets: SetTypes = parseSets(res.data);
    setSets(parsedSets);
  });

  const goSet = (setId: number, setName: string) => () => navigate('Set', { setId, setName });
  const setEType = (e: string) => () => setExpansionType(e);

  const renderSet = (set: SetProps) => (
    <TouchableOpacity key={set.id} onPress={() => goSet(set.id, set.name)} style={styles.set}>
      <FastImage
        source={{ uri: `https://s3-us-west-2.amazonaws.com/static.yugiohargentina.com/expansions/${set.code}.png`}}
        style={styles.setImage}
      />
    </TouchableOpacity>
  )

  const renderTypes = () => {
    const eTypes = [];

    for (let eType in ExpansionType) {
      eTypes.push(<TextBadge key={eType} label={eType} onPress={setEType(eType)} variant="primary" style={{ marginRight: 4}} />)
    }

    return eTypes;
  }

  React.useEffect(() => {
    setExpansionType(ExpansionType.EXPANSION);
    fetchSets({ eraId: params?.eraId });
  }, [params]);

  return (
    <Layout header title={`Sets de Yu-Gi-Oh! ${params?.eraName}`} withBack noScroll style={styles.layout}>
      <View style={styles.typesContainer}>
        <ScrollView horizontal contentContainerStyle={styles.types} style={styles.types}>
          {renderTypes()}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {sets && sets?.[expansionType]?.map(renderSet)}
      </ScrollView>
    </Layout>
  );
};

export default Sets;
