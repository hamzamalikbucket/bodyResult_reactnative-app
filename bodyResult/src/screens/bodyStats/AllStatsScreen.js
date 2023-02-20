import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {Toolbar} from '../../components/Toolbar';
import {IMAGES} from '../../utils/Images';
import {theme} from '../../utils/Theme';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
const WIDTH = Dimensions.get('window').width;

const state = {
  tableHead: ['Date', 'Arm', 'Chest', 'Legs', 'Total'],
  tableTitle: ['1', '2', '3', '4'],
  tableData: [
    ['1', '2', '3', '1'],
    ['2', '7', '7', '3'],
    ['4', '4', '8', '4'],
    ['5', '2', '5', '7'],
  ],
};

const AllStatsScreen = () => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Pressable>
        <Image source={IMAGES.LEFT} style={styles.imgLeft} />
      </Pressable>
      <View>
        <Text style={styles.toolbar} fontWeight="700" variant="h2Regular20">
          Last 60 days
        </Text>
        <Text style={{textAlign: 'center'}} variant="body1Regular12">
          In cm
        </Text>
      </View>
      <Pressable>
        <Image source={IMAGES.RIGHT} style={styles.imgLeft} />
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Toolbar title="Body Stats" />
      {renderHeader()}
      <Spacer40 />

      <View>
        <Text fontWeight={'700'} style={styles.center}>
          Total Body Measurement
        </Text>
        <LineChart
          data={{
            labels: ['01/05', '07/05', '14/05', '21/05'],
            datasets: [
              {
                data: [180, 90, 110, 200],
              },
            ],
          }}
          width={WIDTH}
          height={190}
          withInnerLines={false}
          withHorizontalLines={true}
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            fillShadowGradientFrom: '#fff',
            fillShadowGradientTo: '#fff',
            color: (opacity = 0.24) => `rgba(68, 182, 86, ${opacity})`,
            labelColor: () => `black`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '0',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <Spacer30 />
      <View style={{backgroundColor: theme.colors.primary500}}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row
            data={state.tableHead}
            flexArr={[1, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={state.tableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows
              data={state.tableData}
              flexArr={[1, 1, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  toolbar: {textAlign: 'center'},
  imgLeft: {width: 48, height: 56},
  center: {textAlign: 'center', marginVertical: 20},
  head: {height: 40},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1},
  row: {height: 28},
  text: {textAlign: 'center', color: 'black'},
});
export default AllStatsScreen;
