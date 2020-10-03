new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        
        empezarPartida: function () {
         this.hayUnaPartidaEnJuego = true;
         this.saludJugador = 100;
         this.saludMonstruo = 100;  
         this.turnos = [];  
        },
        
        atacar: function () {
        
        let max = this.rangoAtaque[1];
        let min = this.rangoAtaque[0];    
        var danio = this.calcularHeridas(max,min);

        this.saludMonstruo -= danio;

        let turno = {
            esJugador:true,
            text:`EL JUGADOR GOLPEA AL MONSTRUO POR ${danio}`
        }
        this.registrarEvento(turno);

        if(this.verificarGanador()){
            return;
        }

        this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
        let max = this.rangoAtaqueEspecial[1];
        let min = this.rangoAtaqueEspecial[0];    
        var danioEspecial = this.calcularHeridas(max,min);
        
        this.saludMonstruo -= danioEspecial;
        
        let turno = {
            esJugador:true,
            text:`EL JUGADOR GOLPEA DURAMENTE AL MONSTRUO POR ${danioEspecial}`
        }
        this.registrarEvento(turno);
        
        if(this.verificarGanador()){
            return;
        }
        this.ataqueDelMonstruo();
        },

        curar: function () {
          if(this.saludJugador <=90){
              this.saludJugador +=10;
          }else{
              this.saludJugador = 100;
          }
          this.ataqueDelMonstruo();  
        },

        terminarPartida: function () {
        this.hayUnaPartidaEnJuego = false;    
        },

        registrarEvento(evento) {
        this.turnos.unshift(evento);
        },
       
        ataqueDelMonstruo: function () {
        let max = this.rangoAtaqueDelMonstruo[1];
        let min = this.rangoAtaqueDelMonstruo[0];    
        var danioMonstruo = this.calcularHeridas(max,min);

        this.saludJugador -= danioMonstruo;
        let turno = {
            esJugador:true,
            text:`EL MONSTRUO GOLPEA AL JUGADOR POR ${danioMonstruo}`
        }
        this.registrarEvento(turno);
        this.verificarGanador();
        },

        calcularHeridas: function (max,min) {
            return Math.max(Math.floor(Math.random()*max) +1, min);
        },
        
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
              if(confirm('Ganaste! Jugar de nuevo?')){
                  this.empezarPartida();
              }
              else{
                  this.hayUnaPartidaEnJuego = false;  
              }  
              return true;
           }else if (this.saludJugador <=0){
              if(confirm('Perdiste! Deseas jugar de nuevo?')){
                 this.empezarPartida(); 
              } else{
                 this.hayUnaPartidaEnJuego = false;  
              } 
              return true;
           }
              return false;
        },
        
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});