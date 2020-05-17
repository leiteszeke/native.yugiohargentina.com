import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    padding: 16,
  },

  tournamentContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 4,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    elevation: 4,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowOpacity: 1,
  },

  tournamentImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },

  tournamentImage: {
    height: 90,
    width: 90,
    borderRadius: 8,
    marginTop: 8,
  },

  tournamentData: {
    flex: 1,
    padding: 4,
    marginTop: 4,
  },

  tournamentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  tournamentPlayers: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },

  tournamentPlayersCount: {
    fontSize: 20,
    marginLeft: 6,
    flex: 1,
    marginBottom: 4,
  },

  tournamentRounds: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  tournamentRoundsData: {
    flex: 1,
    flexDirection: 'row',
  },

  tournamentRoundsCount: {
    fontSize: 20,
    marginHorizontal: 6,
    marginBottom: 4,
  },

  tournamentPlayersTopCount: {
    fontSize: 20,
    marginLeft: 6,
    flex: 1,
  },

  tournamentDateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  tournamentDate: {
    fontSize: 20,
    marginLeft: 6,
  },
});
