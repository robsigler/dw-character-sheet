import Browser
import Html exposing (Html, button, div, text, label, input, h1, ul, li)
import Html.Attributes exposing (for, type_, id)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = Character
type alias Character =
  { name: String
  , gear: List Item
  }
type alias Item =
  { name : String
  , weight : Int
  }

init : Model
init =
  Character "Helga"
  [ Item "Adventuring Gear" 1
  , Item "Dungeon Rations" 1
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
  div [] [
    div [] [
      label [for "Name"] [text "Name:"]
    , input [(type_ "Text"),(id "Name")] []
    ]
    , viewGear model.gear
  ]

viewGear : List Item -> Html Msg
viewGear gear =
  div []
  [ h1 [] [text "Gear"]
  , ul [] (List.map viewItem gear)
  ]

viewItem : Item -> Html Msg
viewItem item =
  li [] [text (item.name ++ " (" ++ (String.fromInt item.weight) ++ " weight)")]