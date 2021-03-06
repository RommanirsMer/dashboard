package com.dashboard.models.services.football;

import com.dashboard.models.Service;
import com.dashboard.models.Widget;
import com.dashboard.models.services.pokemon.PokemonSearchWidget;

import java.util.ArrayList;
import java.util.List;

public class FootballService extends Service {
    public FootballService() {
        this.setName("football");
        List<Widget> widgets = new ArrayList<>();

        FootballLiveWidget footballLiveWidget = new FootballLiveWidget();
        FootballLastMatchWidget footballLastMatchWidget = new FootballLastMatchWidget();
        widgets.add(footballLiveWidget);
        widgets.add(footballLastMatchWidget);
        this.setWidgets(widgets);
    }
}
