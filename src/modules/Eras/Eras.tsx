// Dependencies
import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, TouchableOpacity } from 'react-native';
// Components
import Layout from '#components/Layout';
// Styles
import styles from './Eras.styles';
// Services
import { all } from '#services/eras';
import { navigate } from '#services/navigation';
// Types
import { MyObject } from '#types';

type EraProps = {
  id: number;
  name: string;
  image: string;
  firstSet?: string;
  lastSet?: string;
};

const Eras = () => {
  const [eras, setEras] = React.useState<Array<EraProps> | null>(null);

  const fetchEras = () => all().then((res: MyObject) => setEras(res.data));
  const goSets = (eraId: number, eraName: string) => () =>
    navigate('Sets', { eraId, eraName });

  React.useEffect(() => {
    fetchEras();
  }, []);

  const renderEra = (era: EraProps): Element => (
    <TouchableOpacity
      key={era.id}
      onPress={goSets(era.id, era.name)}
      style={styles.eraContainer}>
      <View style={styles.eraImageContainer}>
        <FastImage
          source={{
            uri: `https://s3-us-west-2.amazonaws.com/static.yugiohargentina.com/eras/${
              era.image
            }`,
          }}
          style={styles.eraImage}
        />
      </View>
      <View style={styles.eraDataContainer}>
        <Text style={styles.eraName}>{era.name}</Text>
        <Text numberOfLines={2}>
          {era.firstSet && `From ${era.firstSet}`}
          {era.lastSet && ` to ${era.lastSet}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout header title="Seleccione una Era" withBack style={styles.layout}>
      {eras && eras.map(renderEra)}
    </Layout>
  );
};

export default Eras;
