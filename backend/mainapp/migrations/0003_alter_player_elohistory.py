# Generated by Django 4.1 on 2024-02-03 22:12

import django.contrib.postgres.fields
from django.db import migrations, models
import mainapp.models


class Migration(migrations.Migration):
    dependencies = [
        ("mainapp", "0002_player_elohistory"),
    ]

    operations = [
        migrations.AlterField(
            model_name="player",
            name="eloHistory",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.IntegerField(),
                default=mainapp.models.get_default_elo_history,
                size=None,
            ),
        ),
    ]