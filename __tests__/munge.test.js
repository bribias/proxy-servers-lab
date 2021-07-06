require('dotenv').config();


const { mungeLocationResponse, mungeWeatherResponse, mungeYelpResponse } = require('../lib/munge');

describe('app routes', () => {
  describe('munge functions', () => {

    test('munges location data and turns into a better object', async () => {

      const expectation = {
        'formatted_query': 'Seattle, King County, Washington, USA',
        'latitude': '47.6038321',
        'longitude': '-122.3300624',
      };
      const input = [
        {
          'place_id': '235549103',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '237385',
          'boundingbox': [
            '47.4810022',
            '47.7341357',
            '-122.459696',
            '-122.224433'
          ],
          'lat': '47.6038321',
          'lon': '-122.3300624',
          'display_name': 'Seattle, King County, Washington, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.772979173564379,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '55417079',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'node',
          'osm_id': '4836954932',
          'boundingbox': [
            '20.7199184',
            '20.7200184',
            '-103.3763786',
            '-103.3762786'
          ],
          'lat': '20.7199684',
          'lon': '-103.3763286',
          'display_name': 'Seattle, Villas de Guadalupe, Zapopan, Jalisco, 38901, Mexico',
          'class': 'place',
          'type': 'neighbourhood',
          'importance': 0.30000000000000004
        },
        {
          'place_id': '156976950',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '291707810',
          'boundingbox': [
            '25.1837689',
            '25.1845505',
            '121.4465868',
            '121.4474398'
          ],
          'lat': '25.18415975',
          'lon': '121.446939985985',
          'display_name': 'Seattle, Lanweibu, Beitou Village, Danhai, Tamsui District, New Taipei, Taiwan',
          'class': 'landuse',
          'type': 'residential',
          'importance': 0.30000000000000004
        },
        {
          'place_id': '84138175',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '10671266',
          'boundingbox': [
            '41.9611659',
            '41.9657274',
            '-121.9226362',
            '-121.9226043'
          ],
          'lat': '41.9641881',
          'lon': '-121.922629',
          'display_name': 'Seattle, Dorris, Siskiyou County, California, 96058, USA',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '90129562',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '22919051',
          'boundingbox': [
            '14.6180684',
            '14.6213139',
            '121.0429669',
            '121.0448923'
          ],
          'lat': '14.6195488',
          'lon': '121.0440164',
          'display_name': 'Seattle, Kaunlaran, Cubao, 4th District, Quezon City, Eastern Manila District, Metro Manila, 1111, Philippines',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '160325077',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '307770120',
          'boundingbox': [
            '28.8472264',
            '28.8487875',
            '-111.9789493',
            '-111.9780146'
          ],
          'lat': '28.8481394',
          'lon': '-111.9783605',
          'display_name': 'Seattle, Nuevo Kino, Bahía Kino, Hermosillo, Sonora, Mexico',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '95155603',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '29546551',
          'boundingbox': [
            '14.4191845',
            '14.4193677',
            '120.9180883',
            '120.9187908'
          ],
          'lat': '14.4192428',
          'lon': '120.918312',
          'display_name': 'Seattle, ACM Woodstock Homes Ph9, Alapan 1-A, Bayan Luma VI, Imus, Cavite, Calabarzon, 4103, Philippines',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '203034631',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '561843639',
          'boundingbox': [
            '47.4112544',
            '47.4112745',
            '-122.2621269',
            '-122.2608738'
          ],
          'lat': '47.4112602',
          'lon': '-122.260923',
          'display_name': 'Seattle, Kent, King County, Washington, 98032, USA',
          'class': 'highway',
          'type': 'service',
          'importance': 0.175
        },
        {
          'place_id': '312432792',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '165271257',
          'boundingbox': [
            '14.6696649',
            '14.6703081',
            '121.0988688',
            '121.0994135'
          ],
          'lat': '14.6703081',
          'lon': '121.0994135',
          'display_name': 'Seattle, Vista Real Classica, Batasan Hills, 2nd District, Quezon City, Eastern Manila District, Metro Manila, 1808, Philippines',
          'class': 'highway',
          'type': 'service',
          'importance': 0.175
        },
        {
          'place_id': '6534059',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'node',
          'osm_id': '668442224',
          'boundingbox': [
            '47.6028456',
            '47.6029456',
            '-122.3398908',
            '-122.3397908'
          ],
          'lat': '47.6028956',
          'lon': '-122.3398408',
          'display_name': 'Seattle, Colman Dock, West Edge, Belltown, Seattle, King County, Washington, 98104, USA',
          'class': 'amenity',
          'type': 'ferry_terminal',
          'importance': 0.101
        }
      ];

      const actual = mungeLocationResponse(input);

      expect(actual).toEqual(expectation);
    });

    test('takes in weather data and turns it into a better object', async() => {

      const expectation = [
        { forecast: 'Thunderstorm with rain', time: 'Wednesday, June 23, 2021' },
        { forecast: 'Few clouds', time: 'Thursday, June 24, 2021' },
        { forecast: 'Scattered clouds', time: 'Friday, June 25, 2021' },
        { forecast: 'Broken clouds', time: 'Saturday, June 26, 2021' },
        { forecast: 'Broken clouds', time: 'Sunday, June 27, 2021' },
        { forecast: 'Scattered clouds', time: 'Monday, June 28, 2021' },
        { forecast: 'Light rain', time: 'Tuesday, June 29, 2021' },
        { forecast: 'Moderate rain', time: 'Wednesday, June 30, 2021' },
        { forecast: 'Broken clouds', time: 'Thursday, July 1, 2021' },
        { forecast: 'Overcast clouds', time: 'Friday, July 2, 2021' },
        { forecast: 'Light rain', time: 'Saturday, July 3, 2021' },
        { forecast: 'Overcast clouds', time: 'Sunday, July 4, 2021' },
        { forecast: 'Overcast clouds', time: 'Monday, July 5, 2021' },
        { forecast: 'Overcast clouds', time: 'Tuesday, July 6, 2021' },
        { forecast: 'Overcast clouds', time: 'Wednesday, July 7, 2021' },
        { forecast: 'Broken clouds', time: 'Thursday, July 8, 2021' }
      ];

      const input = {
        'data': [
          {
            'moonrise_ts': 1624579369,
            'wind_cdir': 'E',
            'rh': 76,
            'pres': 989.523,
            'high_temp': 27.1,
            'sunset_ts': 1624582317,
            'ozone': 317.048,
            'moon_phase': 0.992392,
            'wind_gust_spd': 10.5938,
            'snow_depth': 0,
            'clouds': 34,
            'ts': 1624507260,
            'sunrise_ts': 1624530546,
            'app_min_temp': 20,
            'wind_spd': 3.55111,
            'pop': 65,
            'wind_cdir_full': 'east',
            'slp': 1021.34,
            'moon_phase_lunation': 0.49,
            'valid_date': '2021-06-24',
            'app_max_temp': 28.3,
            'vis': 22.3915,
            'dewpt': 18.4,
            'snow': 0,
            'uv': 9.94789,
            'weather': {
              'icon': 't02d',
              'code': 201,
              'description': 'Thunderstorm with rain'
            },
            'wind_dir': 91,
            'max_dhi': null,
            'clouds_hi': 1,
            'precip': 5.1875,
            'low_temp': 18.7,
            'max_temp': 27.1,
            'moonset_ts': 1624532925,
            'datetime': '2021-06-24',
            'temp': 23.3,
            'min_temp': 19.5,
            'clouds_mid': 0,
            'clouds_low': 34
          },
          {
            'moonrise_ts': 1624669935,
            'wind_cdir': 'ESE',
            'rh': 61,
            'pres': 989.062,
            'high_temp': 28.4,
            'sunset_ts': 1624668723,
            'ozone': 303.021,
            'moon_phase': 0.956391,
            'wind_gust_spd': 10.7969,
            'snow_depth': 0,
            'clouds': 12,
            'ts': 1624593660,
            'sunrise_ts': 1624616964,
            'app_min_temp': 18.6,
            'wind_spd': 2.78318,
            'pop': 0,
            'wind_cdir_full': 'east-southeast',
            'slp': 1020.83,
            'moon_phase_lunation': 0.53,
            'valid_date': '2021-06-25',
            'app_max_temp': 28.9,
            'vis': 24.096,
            'dewpt': 15.9,
            'snow': 0,
            'uv': 10.094,
            'weather': {
              'icon': 'c02d',
              'code': 801,
              'description': 'Few clouds'
            },
            'wind_dir': 105,
            'max_dhi': null,
            'clouds_hi': 5,
            'precip': 0,
            'low_temp': 19.1,
            'max_temp': 28.4,
            'moonset_ts': 1624623384,
            'datetime': '2021-06-25',
            'temp': 24.2,
            'min_temp': 18.5,
            'clouds_mid': 0,
            'clouds_low': 10
          },
          {
            'moonrise_ts': 1624760031,
            'wind_cdir': 'ESE',
            'rh': 70,
            'pres': 988.071,
            'high_temp': 28.3,
            'sunset_ts': 1624755128,
            'ozone': 295.667,
            'moon_phase': 0.894502,
            'wind_gust_spd': 9.79688,
            'snow_depth': 0,
            'clouds': 28,
            'ts': 1624680060,
            'sunrise_ts': 1624703383,
            'app_min_temp': 20.7,
            'wind_spd': 2.5084,
            'pop': 0,
            'wind_cdir_full': 'east-southeast',
            'slp': 1019.79,
            'moon_phase_lunation': 0.56,
            'valid_date': '2021-06-26',
            'app_max_temp': 30.2,
            'vis': 24.096,
            'dewpt': 18.4,
            'snow': 0,
            'uv': 10.2449,
            'weather': {
              'icon': 'c02d',
              'code': 802,
              'description': 'Scattered clouds'
            },
            'wind_dir': 106,
            'max_dhi': null,
            'clouds_hi': 0,
            'precip': 0,
            'low_temp': 20.8,
            'max_temp': 28.3,
            'moonset_ts': 1624713914,
            'datetime': '2021-06-26',
            'temp': 24.5,
            'min_temp': 20.6,
            'clouds_mid': 0,
            'clouds_low': 28
          },
          {
            'moonrise_ts': 1624849559,
            'wind_cdir': 'SE',
            'rh': 66,
            'pres': 986.792,
            'high_temp': 32.3,
            'sunset_ts': 1624841532,
            'ozone': 293.708,
            'moon_phase': 0.813043,
            'wind_gust_spd': 10.1016,
            'snow_depth': 0,
            'clouds': 53,
            'ts': 1624766460,
            'sunrise_ts': 1624789803,
            'app_min_temp': 21.3,
            'wind_spd': 2.74978,
            'pop': 0,
            'wind_cdir_full': 'southeast',
            'slp': 1018.9,
            'moon_phase_lunation': 0.59,
            'valid_date': '2021-06-27',
            'app_max_temp': 32.7,
            'vis': 24.128,
            'dewpt': 18.8,
            'snow': 0,
            'uv': 8.11148,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 127,
            'max_dhi': null,
            'clouds_hi': 19,
            'precip': 0,
            'low_temp': 20.8,
            'max_temp': 32.4,
            'moonset_ts': 1624804328,
            'datetime': '2021-06-27',
            'temp': 26.2,
            'min_temp': 20.6,
            'clouds_mid': 5,
            'clouds_low': 44
          },
          {
            'moonrise_ts': 1624938558,
            'wind_cdir': 'ESE',
            'rh': 62,
            'pres': 988.083,
            'high_temp': 33.8,
            'sunset_ts': 1624927934,
            'ozone': 307,
            'moon_phase': 0.718729,
            'wind_gust_spd': 8.29688,
            'snow_depth': 0,
            'clouds': 49,
            'ts': 1624852860,
            'sunrise_ts': 1624876225,
            'app_min_temp': 21.3,
            'wind_spd': 2.86858,
            'pop': 20,
            'wind_cdir_full': 'east-southeast',
            'slp': 1020.31,
            'moon_phase_lunation': 0.63,
            'valid_date': '2021-06-28',
            'app_max_temp': 33.1,
            'vis': 24.128,
            'dewpt': 17.7,
            'snow': 0,
            'uv': 11.0177,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 123,
            'max_dhi': null,
            'clouds_hi': 31,
            'precip': 0.0625,
            'low_temp': 20.9,
            'max_temp': 33.8,
            'moonset_ts': 1624894541,
            'datetime': '2021-06-28',
            'temp': 26.5,
            'min_temp': 20.6,
            'clouds_mid': 29,
            'clouds_low': 13
          },
          {
            'moonrise_ts': 1624940738,
            'wind_cdir': 'ESE',
            'rh': 68,
            'pres': 988.55,
            'high_temp': 27.9,
            'sunset_ts': 1625014334,
            'ozone': 323.05,
            'moon_phase': 0.617634,
            'wind_gust_spd': 7.91406,
            'snow_depth': 0,
            'clouds': 29,
            'ts': 1624939260,
            'sunrise_ts': 1624962647,
            'app_min_temp': 21.3,
            'wind_spd': 2.84238,
            'pop': 20,
            'wind_cdir_full': 'east-southeast',
            'slp': 1020.8,
            'moon_phase_lunation': 0.66,
            'valid_date': '2021-06-29',
            'app_max_temp': 31.7,
            'vis': 24.128,
            'dewpt': 18.3,
            'snow': 0,
            'uv': 5.54602,
            'weather': {
              'icon': 'c02d',
              'code': 802,
              'description': 'Scattered clouds'
            },
            'wind_dir': 108,
            'max_dhi': null,
            'clouds_hi': 7,
            'precip': 0.125,
            'low_temp': 21.6,
            'max_temp': 31.2,
            'moonset_ts': 1624984552,
            'datetime': '2021-06-29',
            'temp': 25,
            'min_temp': 20.4,
            'clouds_mid': 6,
            'clouds_low': 23
          },
          {
            'moonrise_ts': 1625029024,
            'wind_cdir': 'SE',
            'rh': 80,
            'pres': 986,
            'high_temp': 26.9,
            'sunset_ts': 1625100733,
            'ozone': 314.469,
            'moon_phase': 0.51474,
            'wind_gust_spd': 4.89844,
            'snow_depth': 0,
            'clouds': 99,
            'ts': 1625025660,
            'sunrise_ts': 1625049071,
            'app_min_temp': 22.2,
            'wind_spd': 2.24452,
            'pop': 75,
            'wind_cdir_full': 'southeast',
            'slp': 1018.19,
            'moon_phase_lunation': 0.69,
            'valid_date': '2021-06-30',
            'app_max_temp': 29.7,
            'vis': 21.782,
            'dewpt': 20.4,
            'snow': 0,
            'uv': 3.41303,
            'weather': {
              'icon': 'r01d',
              'code': 500,
              'description': 'Light rain'
            },
            'wind_dir': 136,
            'max_dhi': null,
            'clouds_hi': 91,
            'precip': 8.75,
            'low_temp': 20.4,
            'max_temp': 28.7,
            'moonset_ts': 1625074406,
            'datetime': '2021-06-30',
            'temp': 24.2,
            'min_temp': 20.7,
            'clouds_mid': 49,
            'clouds_low': 2
          },
          {
            'moonrise_ts': 1625117126,
            'wind_cdir': 'SSE',
            'rh': 87,
            'pres': 984.062,
            'high_temp': 32,
            'sunset_ts': 1625187131,
            'ozone': 314.25,
            'moon_phase': 0.413957,
            'wind_gust_spd': 4.60547,
            'snow_depth': 0,
            'clouds': 94,
            'ts': 1625112060,
            'sunrise_ts': 1625135496,
            'app_min_temp': 21,
            'wind_spd': 1.38191,
            'pop': 80,
            'wind_cdir_full': 'south-southeast',
            'slp': 1016.12,
            'moon_phase_lunation': 0.73,
            'valid_date': '2021-07-01',
            'app_max_temp': 29.1,
            'vis': 18.4495,
            'dewpt': 20.4,
            'snow': 0,
            'uv': 3.88248,
            'weather': {
              'icon': 'r02d',
              'code': 501,
              'description': 'Moderate rain'
            },
            'wind_dir': 156,
            'max_dhi': null,
            'clouds_hi': 49,
            'precip': 13.9375,
            'low_temp': 20.2,
            'max_temp': 27.5,
            'moonset_ts': 1625164165,
            'datetime': '2021-07-01',
            'temp': 22.9,
            'min_temp': 20,
            'clouds_mid': 94,
            'clouds_low': 25
          },
          {
            'moonrise_ts': 1625205133,
            'wind_cdir': 'SW',
            'rh': 79,
            'pres': 985.062,
            'high_temp': 32.2,
            'sunset_ts': 1625273526,
            'ozone': 303.938,
            'moon_phase': 0.318398,
            'wind_gust_spd': 8.20312,
            'snow_depth': 0,
            'clouds': 57,
            'ts': 1625198460,
            'sunrise_ts': 1625221922,
            'app_min_temp': 20.8,
            'wind_spd': 2.37547,
            'pop': 60,
            'wind_cdir_full': 'southwest',
            'slp': 1017.06,
            'moon_phase_lunation': 0.76,
            'valid_date': '2021-07-02',
            'app_max_temp': 33.5,
            'vis': 22.952,
            'dewpt': 20.4,
            'snow': 0,
            'uv': 6.42411,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 218,
            'max_dhi': null,
            'clouds_hi': 34,
            'precip': 4.875,
            'low_temp': 21.1,
            'max_temp': 32.2,
            'moonset_ts': 1625253891,
            'datetime': '2021-07-02',
            'temp': 24.9,
            'min_temp': 19.9,
            'clouds_mid': 17,
            'clouds_low': 20
          },
          {
            'moonrise_ts': 1625293126,
            'wind_cdir': 'SW',
            'rh': 70,
            'pres': 985.562,
            'high_temp': 31.6,
            'sunset_ts': 1625359921,
            'ozone': 292.969,
            'moon_phase': 0.230743,
            'wind_gust_spd': 7.80078,
            'snow_depth': 0,
            'clouds': 100,
            'ts': 1625284860,
            'sunrise_ts': 1625308349,
            'app_min_temp': 21.7,
            'wind_spd': 1.76297,
            'pop': 0,
            'wind_cdir_full': 'southwest',
            'slp': 1017.69,
            'moon_phase_lunation': 0.8,
            'valid_date': '2021-07-03',
            'app_max_temp': 32.6,
            'vis': 24.128,
            'dewpt': 19.5,
            'snow': 0,
            'uv': 3.42326,
            'weather': {
              'icon': 'c04d',
              'code': 804,
              'description': 'Overcast clouds'
            },
            'wind_dir': 236,
            'max_dhi': null,
            'clouds_hi': 100,
            'precip': 0,
            'low_temp': 20.4,
            'max_temp': 33.1,
            'moonset_ts': 1625343632,
            'datetime': '2021-07-03',
            'temp': 26.1,
            'min_temp': 20.6,
            'clouds_mid': 3,
            'clouds_low': 30
          },
          {
            'moonrise_ts': 1625381176,
            'wind_cdir': 'WSW',
            'rh': 80,
            'pres': 984.25,
            'high_temp': 22,
            'sunset_ts': 1625446313,
            'ozone': 291,
            'moon_phase': 0.153551,
            'wind_gust_spd': 6.59766,
            'snow_depth': 0,
            'clouds': 98,
            'ts': 1625371260,
            'sunrise_ts': 1625394777,
            'app_min_temp': 22.3,
            'wind_spd': 2.90378,
            'pop': 65,
            'wind_cdir_full': 'west-southwest',
            'slp': 1016.5,
            'moon_phase_lunation': 0.83,
            'valid_date': '2021-07-04',
            'app_max_temp': 30.4,
            'vis': 16.8,
            'dewpt': 21,
            'snow': 0,
            'uv': 3.71998,
            'weather': {
              'icon': 'r01d',
              'code': 500,
              'description': 'Light rain'
            },
            'wind_dir': 238,
            'max_dhi': null,
            'clouds_hi': 77,
            'precip': 5.25,
            'low_temp': 19.8,
            'max_temp': 28.7,
            'moonset_ts': 1625433415,
            'datetime': '2021-07-04',
            'temp': 24.8,
            'min_temp': 21.6,
            'clouds_mid': 55,
            'clouds_low': 28
          },
          {
            'moonrise_ts': 1625469356,
            'wind_cdir': 'S',
            'rh': 63,
            'pres': 982.5,
            'high_temp': 21.8,
            'sunset_ts': 1625532704,
            'ozone': 293.375,
            'moon_phase': 0.0894298,
            'wind_gust_spd': 6.89844,
            'snow_depth': 0,
            'clouds': 92,
            'ts': 1625457660,
            'sunrise_ts': 1625481206,
            'app_min_temp': 22.1,
            'wind_spd': 2.72369,
            'pop': 0,
            'wind_cdir_full': 'south',
            'slp': 1014.5,
            'moon_phase_lunation': 0.86,
            'valid_date': '2021-07-05',
            'app_max_temp': 32.2,
            'vis': 24.128,
            'dewpt': 18.2,
            'snow': 0,
            'uv': 3.84387,
            'weather': {
              'icon': 'c04d',
              'code': 804,
              'description': 'Overcast clouds'
            },
            'wind_dir': 190,
            'max_dhi': null,
            'clouds_hi': 51,
            'precip': 0,
            'low_temp': 19.5,
            'max_temp': 31.6,
            'moonset_ts': 1625523232,
            'datetime': '2021-07-05',
            'temp': 26.7,
            'min_temp': 21.6,
            'clouds_mid': 48,
            'clouds_low': 29
          },
          {
            'moonrise_ts': 1625557740,
            'wind_cdir': 'SW',
            'rh': 92,
            'pres': 984.75,
            'high_temp': 25.1,
            'sunset_ts': 1625619094,
            'ozone': 295.125,
            'moon_phase': 0.0410198,
            'wind_gust_spd': 8.91406,
            'snow_depth': 0,
            'clouds': 76,
            'ts': 1625544060,
            'sunrise_ts': 1625567636,
            'app_min_temp': 22.7,
            'wind_spd': 2.93185,
            'pop': 50,
            'wind_cdir_full': 'southwest',
            'slp': 1016.75,
            'moon_phase_lunation': 0.9,
            'valid_date': '2021-07-06',
            'app_max_temp': 22.8,
            'vis': 24.128,
            'dewpt': 20.7,
            'snow': 0,
            'uv': 3.41428,
            'weather': {
              'icon': 'c04d',
              'code': 804,
              'description': 'Overcast clouds'
            },
            'wind_dir': 223,
            'max_dhi': null,
            'clouds_hi': 53,
            'precip': 3.125,
            'low_temp': 21.2,
            'max_temp': 26.1,
            'moonset_ts': 1625613036,
            'datetime': '2021-07-06',
            'temp': 22.1,
            'min_temp': 20.4,
            'clouds_mid': 72,
            'clouds_low': 76
          },
          {
            'moonrise_ts': 1625646400,
            'wind_cdir': 'W',
            'rh': 90,
            'pres': 988.5,
            'high_temp': 23.1,
            'sunset_ts': 1625705482,
            'ozone': 297.25,
            'moon_phase': 0.0107898,
            'wind_gust_spd': 2.30469,
            'snow_depth': 0,
            'clouds': 100,
            'ts': 1625630460,
            'sunrise_ts': 1625654067,
            'app_min_temp': 21.1,
            'wind_spd': 1.64454,
            'pop': 20,
            'wind_cdir_full': 'west',
            'slp': 1021,
            'moon_phase_lunation': 0.93,
            'valid_date': '2021-07-07',
            'app_max_temp': 22.4,
            'vis': 24.128,
            'dewpt': 19.4,
            'snow': 0,
            'uv': 3.40735,
            'weather': {
              'icon': 'c04d',
              'code': 804,
              'description': 'Overcast clouds'
            },
            'wind_dir': 263,
            'max_dhi': null,
            'clouds_hi': 79,
            'precip': 0.1875,
            'low_temp': 19.6,
            'max_temp': 23.1,
            'moonset_ts': 1625702741,
            'datetime': '2021-07-07',
            'temp': 21.2,
            'min_temp': 19.6,
            'clouds_mid': 100,
            'clouds_low': 36
          },
          {
            'moonrise_ts': 1625735396,
            'wind_cdir': 'WSW',
            'rh': 91,
            'pres': 989.25,
            'high_temp': 23.1,
            'sunset_ts': 1625791868,
            'ozone': 305.375,
            'moon_phase': 0.0107898,
            'wind_gust_spd': 2.4043,
            'snow_depth': 0,
            'clouds': 100,
            'ts': 1625716860,
            'sunrise_ts': 1625740499,
            'app_min_temp': 20.3,
            'wind_spd': 1.21308,
            'pop': 15,
            'wind_cdir_full': 'west-southwest',
            'slp': 1021.75,
            'moon_phase_lunation': 0.96,
            'valid_date': '2021-07-08',
            'app_max_temp': 22.4,
            'vis': 24.128,
            'dewpt': 19.4,
            'snow': 0,
            'uv': 3.39924,
            'weather': {
              'icon': 'c04d',
              'code': 804,
              'description': 'Overcast clouds'
            },
            'wind_dir': 237,
            'max_dhi': null,
            'clouds_hi': 99,
            'precip': 0.4375,
            'low_temp': 19.5,
            'max_temp': 23.1,
            'moonset_ts': 1625789141,
            'datetime': '2021-07-08',
            'temp': 20.8,
            'min_temp': 19.5,
            'clouds_mid': 100,
            'clouds_low': 64
          },
          {
            'moonrise_ts': 1625824755,
            'wind_cdir': 'S',
            'rh': 79,
            'pres': 989.75,
            'high_temp': 27.9,
            'sunset_ts': 1625878252,
            'ozone': 305.875,
            'moon_phase': 0.000726167,
            'wind_gust_spd': 3.62305,
            'snow_depth': 0,
            'clouds': 45,
            'ts': 1625803260,
            'sunrise_ts': 1625826931,
            'app_min_temp': 19.9,
            'wind_spd': 2.18493,
            'pop': 0,
            'wind_cdir_full': 'south',
            'slp': 1022.25,
            'moon_phase_lunation': 1,
            'valid_date': '2021-07-09',
            'app_max_temp': 25.4,
            'vis': 24.128,
            'dewpt': 18.1,
            'snow': 0,
            'uv': 4.59275,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 176,
            'max_dhi': null,
            'clouds_hi': 16,
            'precip': 0,
            'low_temp': 21.2,
            'max_temp': 27.9,
            'moonset_ts': 1625878647,
            'datetime': '2021-07-09',
            'temp': 22.3,
            'min_temp': 19.5,
            'clouds_mid': 45,
            'clouds_low': 35
          }
        ],
        'city_name': 'Fayetteville',
        'lon': '-84.45493',
        'timezone': 'America/New_York',
        'lat': '33.44873',
        'country_code': 'US',
        'state_code': 'GA'
      };
      

      const actual = mungeWeatherResponse(input);

      expect(actual).toEqual(expectation);
    });
  
  });
});
