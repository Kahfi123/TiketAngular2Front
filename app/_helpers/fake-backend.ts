import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let days: any[] = [
          {id: 1, date: new Date('2016-11-09T00:00:00')},
          {id: 2, date: new Date('2016-11-10T00:00:00')},
          {id: 3, date: new Date('2016-11-11T00:00:00')},
          {id: 4, date: new Date('2016-11-12T00:00:00')}
        ];
        let stations: any[] = [
          {id: 1, name: 'Gambir'},
          {id: 2, name: 'Bandung'},
          {id: 3, name: 'Bekasi'},
          {id: 4, name: 'Cimekar'},
        ];
        let trains: any[] = [
          {id: 18, name: 'Argo Parahyangan', date_id: 1, departure_on: new Date('2016-11-09T11:50:00'), arrive_on: new Date('2016-11-09T14:57:00'), departure_in : 1,  arrive_in : 2, duration: 187, price: 120000, slot: 120},
          {id: 20, name: 'Sumber Kencono', date_id: 2, departure_on: new Date('2016-11-09T11:50:00'), arrive_on: new Date('2016-11-09T14:57:00'),  departure_in : 1,  arrive_in : 2, duration: 187, price: 110000, slot: 100},
          {id: 19, name: 'Express Indonesia', date_id: 2, departure_on: new Date('2016-11-09T11:50:00'), arrive_on: new Date('2016-11-09T14:57:00'),  departure_in : 2,  arrive_in : 1, duration: 187, price: 200000, slot: 70},
          {id: 24, name: 'Argo Parahyangan', date_id: 1, departure_on: new Date('2016-11-09T11:50:00'), arrive_on: new Date('2016-11-09T14:57:00'),  departure_in : 1,  arrive_in : 2, duration: 187, price: 120000, slot: 0}
        ];

        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

              // cekKodeBooking
              if (connection.request.url.endsWith('/api/cekKode') && connection.request.method === RequestMethod.Post) {
                  // get parameters from post request
                  let params = JSON.parse(connection.request.getBody());

                  // find if any user matches login credentials
                  let filteredUsers = users.filter(user => {
                      return user.kodePembayaran == params.kodePembayaran;
                  });

                  if (filteredUsers.length) {
                      // if login details are valid return 200 OK with user details and fake jwt token

                      let user = filteredUsers[0];
                      if(!user.statusPembayaran)
                      {
                        user.kodeBooking="*********";
                      }
                      connection.mockRespond(new Response(new ResponseOptions({
                          status: 200,
                          body: {
                              kodeBooking : user.kodeBooking,
                              kodePembayaran : user.kodePembayaran,
                              namaPenumpang : user.namaPenumpang,
                              idPenumpang : user.idPenumpang,
                              namaPemesan: user.namaPemesan,
                              token: 'fake-jwt-token'
                          }
                      })));
                  } else {
                      // else return 400 bad request
                      connection.mockError(new Error('Kode Pembayaran tidak ditemukan'));
                  }
              }
              //show trains
              if (connection.request.url.endsWith('/api/showTrains') && connection.request.method === RequestMethod.Post) {
                  // get parameters from post request
                  let params = JSON.parse(connection.request.getBody());

                  // find if any user matches login credentials
                  let filteredTrains = trains.filter(train => {

                      return train.date_id== params.date && train.departure_in ==params.departure && train.arrive_in == params.arrive;
                  });

                  if (filteredTrains.length) {
                      // if login details are valid return 200 OK with user details and fake jwt token



                      connection.mockRespond(new Response(new ResponseOptions({
                          status: 200,
                          body: {
                              filteredTrains
                          }
                      })));
                  } else {
                      // else return 400 bad request
                      connection.mockError(new Error('Tiket tidak ditemukan'));
                  }
              }
              // konfirmasiPembayaran
              if (connection.request.url.endsWith('/api/konfirmasiPembayaran') && connection.request.method === RequestMethod.Post) {
                  // get parameters from post request
                  let params = JSON.parse(connection.request.getBody());
                  let temp;
                  // find if any user matches login credentials
                  let i = 0;
                  let filteredUsers = users.filter(user => {
                    if(user.kodePembayaran == params.kodePembayaran)
                    {
                      users[i].statusPembayaran = true;
                    }
                    i++;
                      return user.kodePembayaran == params.kodePembayaran;
                  });
                  localStorage.setItem('users', JSON.stringify(users));
                  if (filteredUsers.length) {
                      // if login details are valid return 200 OK with user details and fake jwt token

                      let user = filteredUsers[0];
                      connection.mockRespond(new Response(new ResponseOptions({
                          status: 200
                      })));
                  } else {
                      // else return 400 bad request
                      connection.mockError(new Error('Kode Pembayaran tidak ditemukan'));
                  }
              }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }
                //get all days
                if (connection.request.url.endsWith('/api/days') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: days })));


                }
                //get all stations
                if (connection.request.url.endsWith('/api/stations') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: stations })));


                }
                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // create user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());



                    // save new user
                    newUser.id = users.length + 1;
                    newUser.kodePembayaran = users.length + 10000000;
                    newUser.kodeBooking = users.length + 20000000;
                    newUser.statusPembayaran = false;

                    users.push(newUser);

                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(newUser));

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }


                // delete user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};
