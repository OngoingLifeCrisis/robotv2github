// recived number is 1. This means when A is pressed on the other microbit, the line action state is 1, telling the robot that it needs to follow the line
radio.onReceivedNumber(function (receivedNumber) {
    // warning beeps
    music.playTone(262, music.beat(BeatFraction.Whole))
    music.playTone(330, music.beat(BeatFraction.Whole))
    // lower the plates
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, -45, 0)
    qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -45, 0)
    // 0 means not following line. 1 means follow line
    Line_action_state = receivedNumber
    control.waitMicros(2000000)
    // 0 means not following line. 1 means follow line
    sensing_state = 1
})
// set up robot and move servos to start position
let sensing_state = 0
let Line_action_state = 0
qdee.qdee_Init()
qdee.qdee_init_colorSensor(qdee.colorSensorPort.port4)
// kind of like the frequency our microbits commmunicate on
radio.setGroup(39)
// 0 means not following line. 1 means follow line
Line_action_state = 0
// 0 means not following line. 1 means follow line
sensing_state = 1
// index 1 and 2 are the names of our servos.
// 
// set the starting position of plate. Raised
qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, 20, 0)
qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -120, 0)
basic.forever(function () {
    while (Line_action_state == 1) {
        if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_OUT)) {
            qdee.qdee_setMotorSpeed(-30, 50)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_IN)) {
            qdee.qdee_setMotorSpeed(50, -30)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_IN)) {
            qdee.qdee_setMotorSpeed(50, 50)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_OUT)) {
            qdee.qdee_setMotorSpeed(-30, -30)
        }
    }
})
// for when it reaches the station
basic.forever(function () {
    if (Line_action_state == 1) {
        if (sensing_state == 1) {
            if (qdee.qdee_checkCurrentColor(qdee.qdee_Colors.Blue)) {
                // sensing state=1 means it is checking whether it has reached the stall
                sensing_state = 0
                // sensing state=1 means it is checking whether it has reached the stall
                Line_action_state = 0
                // raise the plates
                qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, 19, 0)
                qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -120, 0)
            }
        }
    }
})
// for when it reaches the stall
basic.forever(function () {
    if (Line_action_state == 1) {
        if (sensing_state == 1) {
            if (qdee.qdee_checkCurrentColor(qdee.qdee_Colors.Red)) {
                // sensing state=1 means it is checking whether it has reached the stall
                sensing_state = 0
                // sensing state=1 means it is checking whether it has reached the stall
                Line_action_state = 0
                // raise the plates
                qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, -46, 0)
                qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -45, 0)
            }
        }
    }
})
basic.forever(function () {
    if (Line_action_state == 0) {
        qdee.qdee_setMotorSpeed(0, 0)
    }
})
