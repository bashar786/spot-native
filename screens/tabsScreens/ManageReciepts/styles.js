<Snackbar
        visible={SnackBarVisible}
        onDismiss={setSnackBarVisible(false)}
        duration={2000} // Duration in milliseconds (2000ms = 2s)
        style={styles.snackbar}
      >
        <View style={styles.snackbarContent}>
          <MaterialIcons name="done-outline" size={24} color="black" />
          <Text style={styles.snackbarText}>You’ve successfully updated this recipient</Text>
        </View>
      </Snackbar>


snackbar: {
  backgroundColor: '#ADF1CE',
},
snackbarContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
snackbarText: {
  marginLeft: 8,
  color: Colors.green, // Change this to your preferred text color
  fontFamily: 'Poppins-Medium'
},