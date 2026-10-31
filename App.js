import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return (
      <View style={styles.camContainer}>
        <View style={styles.cameraFake}>
          <Text style={styles.camText}>📷 MORA CAMERA</Text>
          <Text style={styles.camSub}>Real camera will work when you build APK</Text>
        </View>
        <TouchableOpacity style={styles.camClose} onPress={()=>setShowCamera(false)}>
          <Text style={styles.camCloseText}>✕ Close Camera</Text>
        </TouchableOpacity>
        <View style={styles.shutter}><Text style={styles.shutterText}>●</Text></View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <View style={styles.myBitmoji}><Text>🔥</Text></View>
            <View style={styles.search}><Text>🔍</Text></View>
          </View>
          <Text style={styles.chatTitle}>MORA</Text>
          <View style={styles.topRight}>
            <Text style={styles.icon}>🔔</Text>
            <View style={styles.addBtn}><Text style={styles.addText}>👤+ 7</Text></View>
          </View>
        </View>

        <View style={styles.tabs}>
          <Text style={styles.tab}>My AI</Text>
          <Text style={styles.tab}>Near Me</Text>
          <Text style={styles.tabActive}>Stories ❹</Text>
          <Text style={styles.tab}>Best Friends</Text>
        </View>

        <ScrollView>
          {[
            {n:'Little princess', s:'Opened · 5d', c:'👸', r:'🎃'},
            {n:'HAMZA FAREED DAR', s:'Received · 1w', c:'🧔', r:'🎃'},
            {n:'Saheed 😈💫', s:'Opened · 1d', c:'😎', r:'🦇'},
            {n:'Lexez Lekan', s:'Tap to chat', c:'👧🏾', r:'📷'},
            {n:'Sam', s:'Tap to chat', c:'🧔🏽', r:'📷'},
            {n:'Littlesaint', s:'Received · 5w', c:'✨', r:'📷'},
          ].map((u,i)=>(
            <View key={i} style={styles.row}>
              <View style={styles.avatar}><Text>{u.c}</Text></View>
              <View style={styles.middle}>
                <Text style={styles.name}>{u.n}</Text>
                <Text style={styles.status}>▷ {u.s}</Text>
              </View>
              <Text style={styles.right}>{u.r}</Text>
            </View>
          ))}
          <Text style={styles.findTitle}>Find Friends for MORA</Text>
          {[
            {n:'Chizzy Beauty', u:'chizzy_beau9118', e:'👩🏼'},
            {n:'adelugbaloveth', u:'lovie_981', e:'👩🏾'},
          ].map((f,i)=>(
            <View key={i} style={styles.findRow}>
              <View style={styles.avatar}><Text>{f.e}</Text></View>
              <View style={styles.middle}>
                <Text style={styles.name}>{f.n}</Text>
                <Text style={styles.small}>{f.u} • IN MY CONTACTS</Text>
              </View>
              <TouchableOpacity style={styles.addOrange}><Text style={styles.addOrangeText}>+ Add</Text></TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottom}>
          <Text style={styles.botIcon}>📍</Text>
          <Text style={styles.botIconActive}>💬</Text>
          <TouchableOpacity onPress={()=>setShowCamera(true)} style={styles.cameraBtn}>
            <Text style={styles.cameraBtnText}>📷</Text>
          </TouchableOpacity>
          <Text style={styles.botIcon}>👥</Text>
          <Text style={styles.botIcon}>▶️</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1, backgroundColor:'#1a0a00'},
  container:{flex:1, backgroundColor:'#231208'},
  topBar:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:12, paddingTop:30},
  topLeft:{flexDirection:'row', gap:10},
  myBitmoji:{width:36, height:36, borderRadius:18, backgroundColor:'#FF6B00', justifyContent:'center', alignItems:'center'},
  search:{width:36, height:36, borderRadius:18, backgroundColor:'#3a2010', justifyContent:'center', alignItems:'center'},
  chatTitle:{color:'#FF6B00', fontSize:24, fontWeight:'900', letterSpacing:2},
  topRight:{flexDirection:'row', gap:12, alignItems:'center'},
  icon:{color:'white', fontSize:20},
  addBtn:{backgroundColor:'#FF6B00', borderRadius:20, paddingHorizontal:8, paddingVertical:4},
  addText:{color:'white', fontWeight:'700', fontSize:12},
  tabs:{flexDirection:'row', gap:15, padding:10},
  tab:{color:'#8a6a50', fontWeight:'600'},
  tabActive:{color:'#FF6B00', fontWeight:'800'},
  row:{flexDirection:'row', alignItems:'center', padding:12, borderBottomWidth:0.5, borderColor:'#3a2010'},
  avatar:{width:50, height:50, borderRadius:25, backgroundColor:'#3a2010', justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#FF6B00'},
  middle:{flex:1, marginLeft:12},
  name:{color:'white', fontSize:15, fontWeight:'700'},
  status:{color:'#8a6a50', fontSize:12, marginTop:2},
  right:{color:'white', fontSize:14},
  findTitle:{color:'white', fontSize:18, fontWeight:'800', margin:12, marginTop:20},
  findRow:{flexDirection:'row', alignItems:'center', padding:10},
  small:{color:'#8a6a50', fontSize:11},
  addOrange:{backgroundColor:'#FF6B00', borderRadius:20, paddingHorizontal:14, paddingVertical:6},
  addOrangeText:{color:'white', fontWeight:'700'},
  bottom:{flexDirection:'row', justifyContent:'space-around', padding:14, borderTopWidth:1, borderColor:'#3a2010', backgroundColor:'#1a0a00', alignItems:'center'},
  botIcon:{fontSize:22}, botIconActive:{fontSize:22},
  cameraBtn:{width:64, height:64, borderRadius:32, backgroundColor:'#FF6B00', justifyContent:'center', alignItems:'center', marginTop:-20, borderWidth:3, borderColor:'#1a0a00'},
  cameraBtnText:{fontSize:28},
  camContainer:{flex:1, backgroundColor:'black'},
  cameraFake:{flex:1, justifyContent:'center', alignItems:'center'},
  camText:{color:'#FF6B00', fontSize:28, fontWeight:'900'},
  camSub:{color:'white', marginTop:10},
  camClose:{position:'absolute', top:50, left:20, backgroundColor:'#FF6B00', padding:10, borderRadius:20},
  camCloseText:{color:'white', fontWeight:'700'},
  shutter:{position:'absolute', bottom:40, alignSelf:'center', width:80, height:80, borderRadius:40, backgroundColor:'white', borderWidth:5, borderColor:'#FF6B00', justifyContent:'center', alignItems:'center'},
  shutterText:{fontSize:40},
});