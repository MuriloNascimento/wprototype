class WelcomeController < ApplicationController
    def index
        @items = Item.all
        @item_types = ItemType.all
    end
end
