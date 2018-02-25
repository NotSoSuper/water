import Snowflake from "../Snowflake";

export default interface MessageableChannel {
    last_message_id: Snowflake | null;
    last_pin_timestamp: Date | null;
}
