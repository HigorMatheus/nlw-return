interface Area {
    horarioInicial: string
    horarioFinal: string
}
interface Reservation {
    hourStart: string
    hourEnd: string
}
namespace ReservationUseCase {
    export type Params = {
        area: Area
        reservas: Reservation[]
    }

    export type Response = {
        hours: Array<{
            hours: number
            minutes: Array<{
                interval: number,
                isAvailable: boolean,
            }>
        }>
    }
}
const horas =Array.from({length:24 },(item, index) => index)
const minutesList =Array.from({length:60 },(item, index) => Number(`0,${index}`));
const hourseMinutes = minutesList.flatMap((item, index) =>{
    return Number(`0,${item}`)
})
const hours = horas

    
    // ...Array.from({length:24 },(item, index) => index + 0.30 ),


// fill(true).map((__, index) => {
//     return  index+0.5
// })
const minutes = (number: number) =>{
   return Number(`0.${number}`)
}
export class ReservationUseCase {
    execute({ area, reservas }: ReservationUseCase.Params): ReservationUseCase.Response {
        const hoursFormat = hours.sort((a, b) => a - b)
        const reserves = reservas.map((reservation) => {
            const [hourReseStart, MinuteStart] = reservation.hourStart.split(':',)
            const [hourReseEnd, MinuteEnd] = reservation.hourEnd.split(':')
            
            return {
                start: {
                    hourStart: Number(hourReseStart),
                    minuteStart: Number(MinuteStart),
                },
                end: {
                    hourEnd: Number(hourReseEnd),
                    minuteEnd: Number(MinuteEnd),
                }
            }
        })
        const reservesListEndStart = reserves.map(reserva=>{
            return {
                start: reserva.start.hourStart+ minutes(reserva.start.minuteStart),
                end: reserva.end.hourEnd+ minutes(reserva.end.minuteEnd)
            }
        })

        const listaDePeriodosDasReserva = reservesListEndStart.map(reserva=>{

            const lista= hoursFormat.flatMap(hour=>{
                if(hour<reserva.end&&hour>reserva.start){
                    return null
                }else{
                    return hour
                }
            })
            Array.from(
                  { length: reserva.end - reserva.start },
                  (_, index) => {
                      if(index===0){
                      return    reserva.start
                      }else{
                         return reserva.end
                      }
                  }
                );
        return lista
        })
       console.log({
        listaDePeriodosDasReserva,
           reservesListEndStart
       });
       
        
        const [hourStart, minuteStart,] = area.horarioInicial.split(':')
        const [hourEnd, minuteEnd,] = area.horarioFinal.split(':')
        const areaPeriod = {
            start: {
                hourStart: Number(hourStart),
                minuteStart: Number(minuteStart),
            },
            end: {
                hourEnd: Number(hourEnd),
                minuteEnd: Number(minuteEnd),
            }
        }
        const eachHourArray = Array.from(
            { length: areaPeriod.end.hourEnd - areaPeriod.start.hourStart },
            (_, index) => {
                return {
                    hour: index + areaPeriod.start.hourStart,
                    minutes: [{ interval: 0, isAvailable: true }, { interval: 0, isAvailable: true }]
                }
            }
        );
    
        // console.log(eachHourArray);
        const hoursfiltered = eachHourArray.map(hour => {
            const reserv = reserves.find(reserva => reserva.end.hourEnd === hour.hour)
            if (reserv) {
                if ((hour.hour > reserv?.end.hourEnd && hour.hour > reserv?.start.hourStart)) {
                    return null
                }else{
                    return hour
                }
            } else {
                return hour
            }
        })
            const hoursfilteredTest = new Array()

            for (let index = 0; index < eachHourArray.length; index++) {
                const element = eachHourArray[index];
                const reservEnd = reserves.find(reserva => reserva.end.hourEnd < element.hour)
                const reservStart = reserves.find(reserva => reserva.start.hourStart > element.hour)
                if (reservEnd && reservStart){
                    hoursfilteredTest.push(`teste`)
                }else{
                      hoursfilteredTest.push(element)
                }
               

                
            }

        //    const hoursfiltered = eachHourArray.map(hour=>{
        //       return reservas.flatMap((reservation)=>{
        //           const [hourReseStart,MinuteStart] = reservation.hourStart.split(':')
        //           const [hourReseEnd,MinuteEnd] = reservation.hourEnd.split(':')
        //           if((hour.hour>Number(hourReseStart)&&hour.hour<Number(hourReseEnd)||Number(hourReseStart)<hour.hour && hour.hour<Number(hourReseEnd)) ){

        //                 return null


        //           }else{
        //                  return hour
        //           }

        //        })
        //    })

        // console.log({
        //     hoursfilteredTest,
        //     hoursfiltered
        // });
        // const hourStart = 8;

        // const eachHourArray = Array.from(
        //   { length: 10 },
        //   (_, index) => index + hourStart,
        // );
        // const currentDate = new Date(Date.now());

        // const availability = eachHourArray.map(hour => {
        //   const hasAppointmentInHour = appointments.find(
        //     appointment => getHours(appointment.date) === hour,
        //   );

        //   const compareDate = new Date(year, month - 1, day, hour);
        //   return {
        //     hour,
        //     available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        //   };
        // });
        return {
            hours: []
        }
    }
}