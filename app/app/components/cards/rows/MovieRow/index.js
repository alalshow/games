import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
//import Image from 'react-native-scalable-image';

import { TouchableOpacity } from '../../../common/TouchableOpacity';

import { width, height } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';
import { convertToUpperCaseFirstLetter } from '../../../../utils/letters';
import { convertToYear } from '../../../../utils/dates';
import { convertTypeWithGenre } from '../../../../utils/genre';

import { ROUTES } from '../../../../navigation/routes';

import isoLanguage from '../../../../data/iso.json';

import styles from './styles';

const getLanguage = value => {
  const str = isoLanguage[value] || '';

  return convertToUpperCaseFirstLetter(str);
};

const renderDivider = (releaseDate, originalLanguage) =>
  releaseDate && originalLanguage !== 'xx' ? (
    <Text style={styles.trace}>|</Text>
  ) : null;

const renderScore = voteAverage => {
  const color =
    voteAverage < 5
      ? 'low'
      : voteAverage >= 5 && voteAverage < 7
      ? 'mid'
      : 'high';

  return (
    <View style={[styles.score, styles[color]]}>
      <Text style={styles.textPercent}>{voteAverage}</Text>
    </View>
  );
};

const MovieRow = memo(
  ({ numColumns, item, type, isSearch, navigate }) => (
    <>
      {numColumns === 1 ? (
        <TouchableOpacity
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View style={styles.containerItem}>
            <Image
              //source={getImageApi(item.poster_path)}
              source={{ uri: item.image_url }}
              style={{
                width: width * 0.3,
                height: height * 0.2,
                borderRadius: 8
              }}
            />

            <View style={styles.item}>
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                {/* <View style={[styles.textRow, styles.containerSubTitle]}>
                  <Text style={styles.textSmall}>
                    {convertToYear(item.release_date)}
                  </Text>
                  {renderDivider(item.release_date, item.original_language)}
                  <Text numberOfLines={1} style={styles.textSmall}>
                    {getLanguage(item.original_language)}
                  </Text>
                </View>
                <Text numberOfLines={1} style={styles.textSmall}>
                  {convertTypeWithGenre(item.genre_ids, type, isSearch)}
                </Text> */}
              </View>
              {
                <View style={[styles.textRow, styles.containerReview]}>
                  <View style={[styles.score, styles['high']]}>
                    <Text style={styles.textPercent}>{item.price}</Text>
                  </View>
                </View>
              }
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.containerTwoItem}
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, { id: item.id, title: item.title })
          }
        >
          <View>
            {/* <Image
              //source={getImageApi(item.poster_path)}
              source={{ uri: item.image_url }}
              style={styles.photo}
              width={width * 0.33}
            /> */}
            <Image
              //source={getImageApi(item.poster_path)}
              source={{ uri: item.image_url }}
              style={{
                width: width * 0.3,
                height: height * 0.2,
                borderRadius: 8
              }}
            />
          </View>
          <Text numberOfLines={2} style={styles.textTwoTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

export default MovieRow;
