import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = List String

init : Model
init =
  [
    "Hello World",
    "This is a message"
  ]


-- UPDATE

type Msg = Increment

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model


-- VIEW

view : Model -> Html Msg
view model =
  div []
    (List.map renderMessage model)

renderMessage: String -> Html Msg
renderMessage message =
  div [] [ text message ]