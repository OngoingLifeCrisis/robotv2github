# recived number is 1. This means when A is pressed on the other microbit, the line action state is 1, telling the robot that it needs to follow the line

def on_received_number(receivedNumber):
    global Line_action_state
    # 0 means not following line. 1 means follow line
    Line_action_state = receivedNumber
    if Line_action_state == 1:
        # warning beeps
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
        music.play_tone(330, music.beat(BeatFraction.WHOLE))
        # lower the plates
        qdee.qdee_setBusServo(qdee.busServoPort.PORT10, 1, 0, 0)
        qdee.qdee_setBusServo(qdee.busServoPort.PORT10, 2, 0, 0)
        while Line_action_state == 1:
            if qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.PORT1,
    qdee.qdee_lineFollower.S1_IN_S2_OUT):
                qdee.qdee_setMotorSpeed(-50, 50)
            elif qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.PORT1,
    qdee.qdee_lineFollower.S1_OUT_S2_IN):
                qdee.qdee_setMotorSpeed(50, -50)
            elif qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.PORT1,
    qdee.qdee_lineFollower.S1_IN_S2_IN):
                qdee.qdee_setMotorSpeed(50, 50)
    elif Line_action_state == 0:
        qdee.qdee_setMotorSpeed(0, 0)
radio.on_received_number(on_received_number)

# set up robot and move servos to start position
Line_action_state = 0
qdee.qdee_Init()
qdee.qdee_init_colorSensor(qdee.colorSensorPort.PORT4)
# kind of like the frequency our microbits commmunicate on
radio.set_group(39)
# 0 means not following line. 1 means follow line
Line_action_state = 0
# 0 means not following line. 1 means follow line
sensing_state = 1
# index 1 and 2 are the names of our servos
qdee.qdee_setBusServo(qdee.busServoPort.PORT10, 1, 0, 0)
qdee.qdee_setBusServo(qdee.busServoPort.PORT10, 2, 0, 0)

def on_forever():
    global sensing_state, Line_action_state
    if Line_action_state == 1:
        if qdee.qdee_checkCurrentColor(qdee.qdee_Colors.RED):
            # sensing state=1 means it is checking whether it has reached the stall
            sensing_state = 0
            # sensing state=1 means it is checking whether it has reached the stall
            Line_action_state = 0
basic.forever(on_forever)
