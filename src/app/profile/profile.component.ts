import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {NavController, Platform} from '@ionic/angular';
import {Geolocation, GeolocationOptions, Geoposition, PositionError} from '@ionic-native/geolocation/ngx';
import {CurrentPositionService} from '../services/current-position.service';
import {google} from '@agm/core/services/google-maps-types';
import {MapsAPILoader} from '@agm/core';
import {NetworkService} from '../services/network.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username = '';
    title = 'My first AGM project';
    lat: any = 0;
    lng: any = 0;
    height = 0;
    startDestinationMarker = {};
    endDestinationMarker = {};
    mapLocations: any[] = [];
    startSet: boolean = false;
    endSet: boolean = false;
    @ViewChild('map') mapContainer: ElementRef;
    map: any;
  constructor(private user: UserService,
              public platform: Platform,
              private geolocation: Geolocation,
              private currentLocation: CurrentPositionService,
              private mapsAPILoader: MapsAPILoader,
              private network: NetworkService,
              private router: Router
  ) {
      console.log(platform.height());
      this.height = platform.height() - 56;
      // this.setCurrentPosition();

  }


  refreshPins() {
      this.network.getRequest(`/locations`)
          .subscribe(
              (response) => {
                  this.mapLocations = response;
                  //alert(response);
              }
          );
  }


  checkLocation() {
      // this.currentLocation.getLocation
      //     .subscribe(
      //         (data) => {
      //             this.geolocation.getCurrentPosition().then((Data) => {
      //                 console.log(Data);
      //                 this.lat = Data.coords.latitude;
      //                 this.lat = Data.coords.longitude;
      //
      //             });
      //         }
      //     );

      this.mapsAPILoader.load().then(() => {
          this.setCurrentPosition();
      });
  }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            });
        }
    }

  ngOnInit() {
      this.refreshPins();

      setInterval(() => {
          this.refreshPins();
          const data = {
              latitude: this.lat,
              longtitude: this.lng,
          };
          this.network.postRequest( data ,`/locations`)
              .subscribe(
                  (response) => {
                      console.log(response);
                  }
              );
      }, 5000);
      // this.currentLocation.getLocation
      //     .subscribe(
      //         (data) => {
      //             this.geolocation.getCurrentPosition().then((Data) => {
      //                 console.log(Data);
      //                 this.lat = Data.coords.latitude;
      //                 this.lat = Data.coords.longitude;
      //             });
      //         }
      //     );
      this.geolocation.getCurrentPosition().then((Data) => {
          // alert("ello");
          // console.log("TEST");
                          // console.log(Data);
          this.lat = Data.coords.latitude;
          this.lng = Data.coords.longitude;
      }).catch((error) => {
          alert(error.message);
          console.log('Error getting location', error);
      });
      this.user.getUser
        .subscribe(
          (user) => {
              this.checkLocation();
              if (localStorage.getItem('username') && localStorage.getItem('password')) {
              this.username = localStorage.getItem('username');
            }
          }
        );
  }

    checkCenter($event) {
      const lat = $event.lat,
          lng = $event.lng;

      if (!this.startSet) {
          this.startDestinationMarker = {
              lat,
              lng
          };
      } else if (!this.endSet) {
          this.endDestinationMarker = {
              lat,
              lng
          };
      }
    }

    getDistanceBetween(p1, p2) {
        var rad = (x) => {
            return x * Math.PI / 180;
        };

        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    }

    getMoney(distance) {
      return distance / 5000;
    }

    logOut() {
      this.user.getUser
          .subscribe(
              (response) => {
                  localStorage.clear();
                  this.startDestinationMarker = '';
                  this.endDestinationMarker = '';
                  this.startSet = false;
                  this.endSet = false;
                  this.router.navigate(['/home']);
              }
          );
    }

    clickAction() {
      if (!this.startSet) {
          this.startSet = true;
      } else if (!this.endSet) {
          this.endSet = true;
      } else {
          const distance = this.getDistanceBetween(this.startDestinationMarker, this.endDestinationMarker);
          let money = this.getMoney(distance);
          console.log(distance);
          money = Math.round(money) + '₾';
          alert("გადასახდელი თანხა: " + money);
      }
    }
}
