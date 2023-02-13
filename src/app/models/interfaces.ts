

// interface FiltroPersonas {
//     estatus_seguimiento: String;
//     tipo_persona: String;
//     fechai: String;
//     fechaf: String;
// }

interface Llamada {
    FECHA_HORA_INICIO_LLAMADA?: String;
    FECHA_LLAMADA?: String;
    HORA_LLAMADA?: String;
    NUMERO_TELEFONO?: String;
    MOTIVO_TELEFONISTA?: String;
    ES_ALTO_IMPACTO?: String;
    ID_MUNICIPIO?: number;
    MUNICIPIO?: String;
    REFERENCIAS?:  String;
    COLONIA?:  String;
    CALLE?:  String;
    ENTRE_CALLE?:  String;
    NUMERO?:  String;
    COORDENADA_X?:  String;
    COORDENADA_Y?:  String;
    DESCRIPCION_DE_LA_LLAMADA?:  String;
    NOMBRE_CORPORACION?:  String;
    FOLIO_LLAMADA?:  String;
    PRIORIDAD?:  String;
    NOMBRE_TIPO_RAZONAMIENTO?:  String;
    OBSERVACION_RAZONAMIENTO?: null,
    RAZON_NO_ATENCION?:  String;
    MOTIVO_RADIO_OPERADOR?:  String;
    NOMBRE_DENUNCIANTE?:  String;
    CALLE_DENUNCIANTE?:  String;
    NUMERO_DENUNCIANTE?:  String;
    COLONIA_DENUNCIANTE?:  String;
    TELEFONO_DENUNCIANTE?:  String;
    MUNICIPIO_DENUNCIANTE?:  String;
    CANTIDAD_DETENIDOS?: number;
    CANTIDAD_LESIONADOS?: number;
    CANTIDAD_MUERTOS?: number;
} 