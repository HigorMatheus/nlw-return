import { ReservationUseCase } from "."

const reservationUseCase = new ReservationUseCase()
describe('teste',()=>{
    it('should list all hours',()=>{
        reservationUseCase.execute({
            area:{
                horarioInicial:'08:00',
                horarioFinal: '20:00'
            },
            reservas:[{
                hourStart: '10:40',
                hourEnd: '13:00',
             
            },
            {
                hourStart: '15:00',
                hourEnd: '17:00',
            }
        ]
        })
    })
})