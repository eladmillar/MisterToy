<template>
  <div>
    <section class="map-btns">
      <button @click="goTo('Tel-Aviv')">Tel-Aviv</button>
      <button @click="goTo('Hadera')">Hadera</button>
      <button @click="goTo('Bat-Yam')">Bat-Yam</button>
    </section>
    <GoogleMap
      class="map"
      api-key="AIzaSyC8NBMO_Jv4ROg5guCXiStnnQ1QoNhLcdE"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
    >
      <Marker :options="{ position: telAviv, label:'TA' }" />
      <Marker :options="{ position: hadera, label:'HA' }" />
      <Marker :options="{ position: batYam, label:'BY' }" />
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  data() {
    return {
      telAviv: { lat: 32.07686158450185, lng: 34.775881010478216 },
      hadera: { lat: 32.45244247193854, lng: 34.95264540887901 },
      batYam: { lat: 32.01505314005633, lng: 34.749544822022515 },
      center: { lat: 32.07686158450185, lng: 34.775881010478216 }
    };
  },
  methods: {
    goTo(place) {
      if (place === "Tel-Aviv")
        return (this.center = {
          lat: 32.07686158450185,
          lng: 34.775881010478216
        });
      if (place === "Hadera")
        return (this.center = {
          lat: 32.45244247193854,
          lng: 34.95264540887901
        });
      if (place === "Bat-Yam")
        return (this.center = {
          lat: 32.01505314005633,
          lng: 34.749544822022515
        });
    }
  },
  components: { GoogleMap, Marker }
};
</script>